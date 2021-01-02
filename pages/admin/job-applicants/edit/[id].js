import BackButton from "components/admin/BackButton";
import LayoutPage from "components/admin/LayoutPage";
import Section from "@/diginext/containers/Section";
import PageHeader from "@/dashkit/PageHeader";
import { InputSelect } from "@/diginext/form/Form";
import ApiCall from "modules/ApiCall";
import { useEffect, useRef, useState } from "react";
import { Button, Select, Tabs } from "antd";
import { useRouter } from "next/router";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import { checkPermission, showError, showMessages, showNotifications, showSuccess } from "@/helpers/helpers";
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";

const {Option} = Select;
const {TabPane} = Tabs;

export const getServerSideProps = TrackingUserSession;

const JobApplicantEdit = ({user}) => {
    const router = useRouter();
    const formInputRef = useRef({});
    const [formInput, setFormInput] = useState({});
    const [myTimeout, setMyTimeout] = useState();
    const [formLoading, setFormLoading] = useState(false);
    const {id} = router.query;

    //Permissions
    const canEdit = checkPermission(user, 'job_applicant_edit');
    const canDetail = checkPermission(user, 'job_applicant_detail');

    //Init load
    useEffect(function () {
        if (!canEdit || !canDetail) {
            showNotifications(['You have no permission.']);
            router.push('/admin');

        } else {
            fetchDetail();
        }
    }, []);

    // methods
    const fetchDetail = function () {
        ApiCall({
            router,
            path: `/api/v1/admin/job-applicants/${id}`,
            token: user.token,
        }).then((res) => {
            if (res.status) {
                let formInput = res.data;
                setFormInput(formInput);
            } else {
                showError(res);
            }
        });
    };

    // save
    const saveHandler = function () {
        let msgs = [];

        let currentFormInput = {
            status: formInputRef.current.status.value.value,
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
                path: `/api/v1/admin/job-applicants/${id}`,
                token: user.token,
                method: 'PUT',
                data: currentFormInput,
                contentType: 1
            }).then((res) => {
                if (res.status) {
                    showSuccess(res);
                    router.push('/admin/job-applicants');
                } else {
                    showError(res);
                }

                setFormLoading(false);
            });
        }, 500);
        setMyTimeout(loginTimeout);
    };

    const header = (
        <PageHeader pretitle="Applicant" title="Update Applicant" button={<BackButton/>} separator={true}>
        </PageHeader>
    );

    return (
        <LayoutPage header={header} user={user}>
            <Section borderBottom={true} style={{padding: "2rem 0"}}>

                {
                    Object.keys(formInput).length ?
                    <HorizontalList itemSize={ListItemSize.STRETCH}>
                        <ListItem style={{marginRight: "1rem"}}>
                            <InputSelect
                                ref={el => formInputRef.current.status = el}
                                label={<label style={{display: "inline-block"}}>Status <span
                                    style={{color: "red"}}>*</span></label>}
                                labelInValue
                                defaultValue={{value: formInput.status}}
                                style={{width: '50%'}}
                            >
                                <Select.Option key={1} value={1}>{'New'}</Select.Option>
                                <Select.Option key={2} value={2}>{'REVIEWED'}</Select.Option>
                                <Select.Option key={3} value={3}>{'APPOINTMENTED'}</Select.Option>
                                <Select.Option key={4} value={4}>{'FAILED'}</Select.Option>
                                <Select.Option key={5} value={5}>{'PASSED'}</Select.Option>
                            </InputSelect>
                        </ListItem>
                    </HorizontalList>
                        : ''
                }

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

export default JobApplicantEdit;
