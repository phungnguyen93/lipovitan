import BackButton from "components/admin/BackButton";
import LayoutPage from "components/admin/LayoutPage";
import Section from "@/diginext/containers/Section";
import AdminButton, { ButtonSize } from "@/dashkit/Buttons";
import PageHeader from "@/dashkit/PageHeader";
import { Input, ValidationType, TextArea, InputSelect } from "@/diginext/form/Form";
import ApiCall from "modules/ApiCall";
import React, { useEffect, useRef, useState } from "react";
import { Switch, Tabs, Divider, Select, Button } from "antd";
import { useRouter } from "next/router";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import {
    showMessages, showSuccess, showError, isFile, checkPermission,
    showNotifications, getFileNameFromPath, strToSlug
} from "@/helpers/helpers";
import { getObjectTrans } from "@/helpers/translation";
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";
import { locales, defaultLocale } from "@/constants/locale";
import SingleImage from '@/diginext/upload/singleImage';
import Editor from '@/diginext/editor/editor';

const {Option} = Select;
const {TabPane} = Tabs;

export const getServerSideProps = TrackingUserSession;

const AdminOfficesCreatePage = ({user}) => {
    const router = useRouter();
    const formInputRef = useRef({});
    const [formInput, setFormInput] = useState({active:true});
    const [myTimeout, setMyTimeout] = useState();
    const [tags, setTags] = useState([]);
    const [formLoading, setFormLoading] = useState(false);
    const {id} = router.query;

    //Permissions
    const canCreate = checkPermission(user, 'office_add');

    //Init load
    useEffect(function () {
        if (!canCreate) {
            showNotifications(['You have no permission.']);
            router.push('/admin');

        }
    }, []);

    // save
    const saveHandler = function () {
        let msgs = [];

        let currentFormInput = {
            // sortOrder: formInputRef.current.sortOrder.value,
            active: formInput.active || false,
            title: {
                vi: formInputRef.current['title_vi'].value,
                en: formInputRef.current['title_en'].value
            },
            address: {
                vi: formInputRef.current['address_vi'].value,
                en: formInputRef.current['address_en'].value
            },
            phone: {
                vi: formInputRef.current['phone_vi'].value,
                en: formInputRef.current['phone_en'].value
            },
            fax: {
                vi: formInputRef.current['fax_vi'].value,
                en: formInputRef.current['fax_en'].value
            },
            email: {
                vi: formInputRef.current['email_vi'].value,
                en: formInputRef.current['email_en'].value
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
                path: `/api/v1/admin/offices`,
                token: user.token,
                method: 'POST',
                data: currentFormInput,
                contentType: 1
            }).then((res) => {
                if (res.status) {
                    // let formInput = res.data;
                    // if (formInput.image) {
                    //     formInput[`imageUrl`] = formInput.image;
                    //     formInput[`image`] = getFileNameFromPath(formInput.image);
                    // }
                    //
                    // if (formInput.imageMb) {
                    //     formInput[`imageMbUrl`] = formInput.imageMb;
                    //     formInput[`imageMb`] = getFileNameFromPath(formInput.imageMb);
                    // }
                    // Object.keys(locales).forEach(function (locale) {
                    //     if (formInput[`metaImage${locale}`] && isFile(formInput[`metaImage${locale}`])) {
                    //         currentFormInput['metaImage'][locale] = formInput[`metaImage${locale}`];
                    //     } else if (formInput[`metaImage${locale}`] == '') {
                    //         currentFormInput['metaImage'][locale] = null;
                    //     } else if (formInput[`metaImage${locale}`]) {
                    //         currentFormInput['metaImage'][locale] = getFileNameFromPath(formInput[`metaImage${locale}`]);
                    //     }
                    // });
                    // setFormInput({
                    //     ...formInput
                    // });
                    showSuccess(res);
                    router.push('/admin/offices');
                } else {
                    showError(res);
                }

                setFormLoading(false);
            });
        }, 500);
        setMyTimeout(loginTimeout);
    };

    //Single Upload
    const handleChangeSingleUpload = function (type, data) {
        setFormInput({
            ...formInput,
            ...data
        });
    };

    const header = (
        <PageHeader pretitle="Office" title="Create Office" button={<BackButton/>} separator={true}>
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

                {/*<HorizontalList itemSize={ListItemSize.STRETCH}>*/}
                {/*    <ListItem style={{marginRight: "1rem"}}>*/}
                {/*        <Input*/}
                {/*            ref={el => formInputRef.current.sortOrder = el}*/}
                {/*            defaultValue={formInput.sortOrder}*/}
                {/*            label="Sort Order"*/}
                {/*            placeholder="0"*/}
                {/*            maxLength="255"*/}
                {/*            validateConditions={[*/}
                {/*                {type: ValidationType.NOT_EMPTY, errMessage: "Bắt buộc"},*/}
                {/*                {type: ValidationType.NUMBERS, errMessage: "Phải là số"}*/}
                {/*            ]}*/}
                {/*        />*/}
                {/*    </ListItem>*/}
                {/*</HorizontalList>*/}

                <Tabs defaultActiveKey={defaultLocale}>
                    {
                        Object.keys(locales)
                            ? Object.keys(locales).map(function (locale) {
                                return (
                                    <TabPane forceRender={true} tab={locales[locale]} key={locale}>
                                        <HorizontalList itemSize={ListItemSize.STRETCH}>
                                            <ListItem style={{marginRight: "1rem"}}>
                                                <Input
                                                    ref={el => formInputRef.current[`title_${locale}`] = el}
                                                    defaultValue={getObjectTrans(formInput.title, locale)}
                                                    label="Title"
                                                    placeholder="Title"
                                                    maxLength="255"
                                                    validateConditions={[{
                                                        type: ValidationType.NOT_EMPTY,
                                                        errMessage: "Bắt buộc"
                                                    }]}
                                                />
                                            </ListItem>
                                        </HorizontalList>
                                        <HorizontalList itemSize={ListItemSize.STRETCH}>
                                            <ListItem style={{marginRight: "1rem"}}>
                                                <Input
                                                    ref={el => formInputRef.current[`address_${locale}`] = el}
                                                    defaultValue={getObjectTrans(formInput.address, locale)}
                                                    label="Address"
                                                    placeholder="Address"
                                                    maxLength="255"
                                                    validateConditions={[{
                                                        type: ValidationType.NOT_EMPTY,
                                                        errMessage: "Bắt buộc"
                                                    }]}
                                                />
                                            </ListItem>
                                        </HorizontalList>
                                        <HorizontalList itemSize={ListItemSize.STRETCH}>
                                            <ListItem style={{marginRight: "1rem"}}>
                                                <Input
                                                    ref={el => formInputRef.current[`phone_${locale}`] = el}
                                                    defaultValue={getObjectTrans(formInput.phone, locale)}
                                                    label="Phone"
                                                    placeholder="Phone"
                                                    maxLength="255"
                                                    validateConditions={[{
                                                        type: ValidationType.NOT_EMPTY,
                                                        errMessage: "Bắt buộc"
                                                    }]}
                                                />
                                            </ListItem>
                                        </HorizontalList>
                                        <HorizontalList itemSize={ListItemSize.STRETCH}>
                                            <ListItem style={{marginRight: "1rem"}}>
                                                <Input
                                                    ref={el => formInputRef.current[`fax_${locale}`] = el}
                                                    defaultValue={getObjectTrans(formInput.fax, locale)}
                                                    label="Phone"
                                                    placeholder="Phone"
                                                    maxLength="255"
                                                    validateConditions={[{
                                                        type: ValidationType.NOT_EMPTY,
                                                        errMessage: "Bắt buộc"
                                                    }]}
                                                />
                                            </ListItem>
                                        </HorizontalList>
                                        <HorizontalList itemSize={ListItemSize.STRETCH}>
                                            <ListItem style={{marginRight: "1rem"}}>
                                                <Input
                                                    ref={el => formInputRef.current[`email_${locale}`] = el}
                                                    defaultValue={getObjectTrans(formInput.email, locale)}
                                                    label="Email"
                                                    placeholder="Email"
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

export default AdminOfficesCreatePage;
