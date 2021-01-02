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

const {TabPane} = Tabs;

export const getServerSideProps = TrackingUserSession;

const AdminMtStoresEditPage = ({user}) => {
    const router = useRouter();
    const formInputRef = useRef({});
    const [formInput, setFormInput] = useState({});
    const [myTimeout, setMyTimeout] = useState();
    const [tags, setTags] = useState([]);
    const [formLoading, setFormLoading] = useState(false);
    const {id} = router.query;

    //Permissions
    const canEdit = checkPermission(user, 'mt_store_edit');
    const canDetail = checkPermission(user, 'mt_store_detail');

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
            path: `/api/v1/admin/mt-stores/${id}`,
            token: user.token,
        }).then((res) => {
            if (res.status) {
                let formInput = res.data;
                if (formInput.image) {
                    formInput[`imageUrl`] = formInput.image;
                    formInput[`image`] = getFileNameFromPath(formInput.image);
                }
                if (formInput.imageMb) {
                    formInput[`imageMbUrl`] = formInput.imageMb;
                    formInput[`imageMb`] = getFileNameFromPath(formInput.imageMb);
                }
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
            // sortOrder: formInputRef.current.sortOrder.value,
            active: formInput.active || false,
            link: {
                vi: formInputRef.current['link_vi'].value,
                en: formInputRef.current['link_en'].value
            },
        };

        if (msgs.length) {
            showMessages(msgs);
            return;
        }

        if (formInput.image && isFile(formInput.image)) {
            currentFormInput.image = formInput.image;
        } else if (formInput.image == '') {
            currentFormInput.image = null;
        }

        if (formInput.imageMb && isFile(formInput.imageMb)) {
            currentFormInput.imageMb = formInput.imageMb;
        } else if (formInput.imageMb == '') {
            currentFormInput.imageMb = null;
        }

        setFormLoading(true);
        clearTimeout(myTimeout);
        let loginTimeout = setTimeout(async function () {
            ApiCall({
                router,
                path: `/api/v1/admin/mt-stores/${id}`,
                token: user.token,
                method: 'PUT',
                data: currentFormInput,
                contentType: 1
            }).then((res) => {
                if (res.status) {
                    // let formInput = res.data;
                    // if (formInput.image) {
                    //     formInput[`imageUrl`] = formInput.image;
                    //     formInput[`image`] = getFileNameFromPath(formInput.image);
                    // }
                    // if (formInput.imageMb) {
                    //     formInput[`imageMbUrl`] = formInput.imageMb;
                    //     formInput[`imageMb`] = getFileNameFromPath(formInput.imageMb);
                    // }
                    // Object.keys(locales).forEach(function (locale) {
                    //     if (formInput[`metaImage${locale}`] && isFile(formInput[`metaImage${locale}`])) {
                    //         currentFormInput['metaImage'][locale] = formInput[`metaImage${locale}`];
                    //     } else {
                    //         currentFormInput['metaImage'][locale] = getFileNameFromPath(formInput[`metaImage${locale}`]);
                    //     }
                    // });
                    // setFormInput({
                    //     ...formInput
                    // });
                    showSuccess(res);
                    router.push('/admin/mt-stores');
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
        <PageHeader pretitle="Modern Channels" title="Update Channel" button={<BackButton/>} separator={true}>
        </PageHeader>
    );

    return (
        <LayoutPage header={header} user={user}>
            <Section borderBottom={true} style={{padding: "2rem 0"}}>

                <HorizontalList style={{width: '50%'}}>
                    <SingleImage
                        name={`image`}
                        imageUrl={formInput[`imageUrl`]}
                        label={'Thumbnail'}
                        handleChange={handleChangeSingleUpload}
                    />
                </HorizontalList>

                <HorizontalList style={{width: '50%'}}>
                    <SingleImage
                        name={`imageMb`}
                        imageUrl={formInput[`imageMbUrl`]}
                        label={'Thumbnail Mobile'}
                        handleChange={handleChangeSingleUpload}
                    />
                </HorizontalList>

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
                                                    ref={el => formInputRef.current[`link_${locale}`] = el}
                                                    defaultValue={getObjectTrans(formInput.link, locale)}
                                                    label="Link"
                                                    placeholder="Link"
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

export default AdminMtStoresEditPage;
