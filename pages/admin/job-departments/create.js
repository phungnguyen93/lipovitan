import BackButton from "components/admin/BackButton";
import LayoutPage from "components/admin/LayoutPage";
import Section from "@/diginext/containers/Section";
import PageHeader from "@/dashkit/PageHeader";
import { Input, ValidationType } from "@/diginext/form/Form";
import ApiCall from "modules/ApiCall";
import { useEffect, useRef, useState } from "react";
import { Button, Select, Switch, Tabs } from "antd";
import { useRouter } from "next/router";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import { checkPermission, showError, showMessages, showNotifications, showSuccess } from "@/helpers/helpers";
import { getObjectTrans } from "@/helpers/translation";
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";
import { defaultLocale, locales } from "@/constants/locale";

const {Option} = Select;
const {TabPane} = Tabs;

export const getServerSideProps = TrackingUserSession;

const AdminJobDepartmentCreatePage = ({user}) => {
    const router = useRouter();
    const formInputRef = useRef({});
    const [formInput, setFormInput] = useState({active: true});
    const [myTimeout, setMyTimeout] = useState();
    const [formLoading, setFormLoading] = useState(false);

    //Permissions
    const canCreate = checkPermission(user, 'job_department_add');

    //Init load
    useEffect(function () {
        if (!canCreate) {
            showNotifications(['You have no permission.']);
            router.push('/admin');

        } else {

        }
    }, []);

    // save
    const saveHandler = function () {
        let msgs = [];

        let currentFormInput = {
            // sortOrder: formInputRef.current.sortOrder.value,
            active: formInput.active || false,
            name: {
                vi: formInputRef.current['name_vi'].value,
                en: formInputRef.current['name_en'].value
            },
        };

        if (msgs.length) {
            showMessages(msgs);
            return;
        }

        setFormLoading(true);
        clearTimeout(myTimeout);
        let loginTimeout = setTimeout(async function () {
            ApiCall({
                router,
                path: `/api/v1/admin/job-departments`,
                token: user.token,
                method: 'POST',
                data: currentFormInput,
                contentType: 1
            }).then((res) => {
                if (res.status) {
                    showSuccess(res);
                    router.push('/admin/job-departments');
                } else {
                    showError(res);
                }

                setFormLoading(false);
            });
        }, 500);
        setMyTimeout(loginTimeout);
    };

    const header = (
        <PageHeader pretitle="Department" title="Create Department" button={<BackButton/>} separator={true}>
        </PageHeader>
    );

    return (
        <LayoutPage header={header} user={user}>
            <Section borderBottom={true} style={{padding: "2rem 0"}}>

                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem style={{marginRight: "1rem"}}>
                        <div className="form-group">
                            <label style={{marginRight: "15px"}}>Status</label>
                            <Switch
                                checked={formInput.active}
                                onChange={() => {
                                    setFormInput({
                                        ...formInput,
                                        active: !formInput.active
                                    })
                                }}
                            />
                        </div>
                    </ListItem>
                </HorizontalList>

                <Tabs defaultActiveKey={defaultLocale}>
                    {
                        Object.keys(locales)
                            ? Object.keys(locales).map(function (locale) {
                                return (
                                    <TabPane forceRender={true} tab={locales[locale]} key={locale}>
                                        <HorizontalList itemSize={ListItemSize.STRETCH}>
                                            <ListItem style={{marginRight: "1rem"}}>
                                                <Input
                                                    ref={el => formInputRef.current[`name_${locale}`] = el}
                                                    defaultValue={getObjectTrans(formInput.name, locale)}
                                                    label="Name"
                                                    placeholder="Name"
                                                    maxLength="255"
                                                    validateConditions={[{
                                                        type: ValidationType.NOT_EMPTY,
                                                        errMessage: "Bắt buộc"
                                                    }]}
                                                />
                                            </ListItem>
                                        </HorizontalList>
                                    </TabPane>
                                )
                            }) : ''
                    }
                </Tabs>

                <Button
                    style={{marginTop: '2rem'}}
                    type="primary"
                    onClick={saveHandler}
                    loading={formLoading}>
                    Save changes
                </Button>
            </Section>
        </LayoutPage>
    )
};

export default AdminJobDepartmentCreatePage;
