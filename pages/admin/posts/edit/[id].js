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

const AdminPostsEditPage = ({user}) => {
    const router = useRouter();
    const formInputRef = useRef({});
    const [formInput, setFormInput] = useState({});
    const [myTimeout, setMyTimeout] = useState();
    const [postCategories, setPostCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [formLoading, setFormLoading] = useState(false);
    const {id} = router.query;

    //Permissions
    const canEdit = checkPermission(user, 'post_edit');
    const canDetail = checkPermission(user, 'post_detail');
    const canPostCategoryList = checkPermission(user, 'post_category_list');
    const canTagList = checkPermission(user, 'tag_list');

    //Init load
    useEffect(function () {
        if (!canEdit || !canDetail) {
            showNotifications(['You have no permission.']);
            router.push('/admin');

        } else {
            fetchDetail();
            if (canPostCategoryList) {
                fetchPostCategories();
            }
            if (canTagList) {
                // fetchTags();
            }
        }
    }, []);

    // methods
    const fetchDetail = function () {
        ApiCall({
            router,
            path: `/api/v1/admin/posts/${id}`,
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
                Object.keys(locales).forEach(function (locale) {
                    if (formInput.metaImage && typeof formInput.metaImage[locale] != 'undefined') {
                        formInput[`metaImage${locale}Url`] = formInput.metaImage[locale];
                        formInput[`metaImage${locale}`] = getFileNameFromPath(formInput.metaImage[locale]);
                    }
                });
                setFormInput(formInput);
            } else {
                showError(res);
            }
        });
    };

    const fetchPostCategories = function () {
        ApiCall({
            router,
            path: `/api/v1/admin/post-categories?selects=id,title&get=true`,
            token: user.token,
        }).then((res) => {
            if (res.status && res.data) {
                setPostCategories(res.data);
            } else {
                setPostCategories([]);
                showError(res);
            }
        });
    };

    const fetchTags = function () {
        ApiCall({
            router,
            path: `/api/v1/admin/tags?selects=id,name&get=true`,
            token: user.token,
        }).then((res) => {
            if (res.status && res.data) {
                setTags(res.data);
            } else {
                setTags([]);
                showError(res);
            }
        });
    };

    // save
    const saveHandler = function () {
        let msgs = [];

        let currentFormInput = {
            postCategory: formInputRef.current.postCategory.value.value,
            // sortOrder: formInputRef.current.sortOrder.value,
            active: formInput.active || false,
            title: {
                vi: formInputRef.current['title_vi'].value,
                en: formInputRef.current['title_en'].value
            },
            slug: {
                vi: formInputRef.current['slug_vi'].value,
                en: formInputRef.current['slug_en'].value
            },
            shortDescription: {
                vi: formInputRef.current['shortDescription_vi'].value,
                en: formInputRef.current['shortDescription_en'].value
            },
            content: {
                vi: formInputRef.current['content_vi'].editor.getData(),
                en: formInputRef.current['content_en'].editor.getData()
            },
            metaImage: {
                vi: formInput.metaImagevi,
                en: formInput.metaImageen
            },
            metaKeyword: {
                vi: formInputRef.current['metaKeyword_vi'].value,
                en: formInputRef.current['metaKeyword_en'].value
            },
            metaDescription: {
                vi: formInputRef.current['metaDescription_vi'].value,
                en: formInputRef.current['metaDescription_en'].value
            },
        };

        if (msgs.length) {
            showMessages(msgs);
            return;
        }

        if (formInput.tagNames && formInput.tagNames.length > 0) {
            currentFormInput['tags'] = formInput.tagNames;
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

        Object.keys(locales).forEach(function (locale) {
            if (formInput[`metaImage${locale}`] && isFile(formInput[`metaImage${locale}`])) {
                currentFormInput['metaImage'][locale] = formInput[`metaImage${locale}`];
            } else {
                currentFormInput['metaImage'][locale] = getFileNameFromPath(formInput[`metaImage${locale}`] || '');
            }
        });

        setFormLoading(true);
        clearTimeout(myTimeout);
        let loginTimeout = setTimeout(async function () {
            ApiCall({
                router,
                path: `/api/v1/admin/posts/${id}`,
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
                    router.push('/admin/posts');
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
        <PageHeader pretitle="Post" title="Update Post" button={<BackButton/>} separator={true}>
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
                {
                    postCategories.length && formInput.postCategory
                        ? <HorizontalList itemSize={ListItemSize.STRETCH}>
                            <ListItem style={{marginRight: "1rem"}}>
                                <InputSelect
                                    ref={el => formInputRef.current.postCategory = el}
                                    label={<label style={{display: "inline-block"}}>Category <span
                                        style={{color: "red"}}>*</span></label>}
                                    labelInValue
                                    defaultValue={{value: formInput.postCategory || postCategories[0].id}}
                                    style={{width: '50%'}}
                                >
                                    {
                                        postCategories.map(function (item) {
                                            return (
                                                <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                                            )
                                        })
                                    }
                                </InputSelect>
                            </ListItem>
                        </HorizontalList>
                        : ''
                }
                {/*{*/}
                {/*    tags.length*/}
                {/*        ? <HorizontalList itemSize={ListItemSize.STRETCH}>*/}
                {/*            <ListItem style={{marginRight: "1rem"}}>*/}
                {/*                <label style={{marginBottom: "5px"}}>Tags</label>*/}
                {/*                <Select*/}
                {/*                    showSearch*/}
                {/*                    optionFilterProp="children"*/}
                {/*                    mode="tags"*/}
                {/*                    size="large"*/}
                {/*                    placeholder="Tags"*/}
                {/*                    defaultValue={formInput.tagNames}*/}
                {/*                    onChange={(tagNames) => {*/}
                {/*                        setFormInput({*/}
                {/*                            ...formInput,*/}
                {/*                            tagNames*/}
                {/*                        })*/}
                {/*                    }}*/}
                {/*                    style={{width: '100%'}}*/}
                {/*                >*/}
                {/*                    {tags.map(function (tag, index) {*/}
                {/*                        return (*/}
                {/*                            <Option key={tag.id} value={tag.name}>{tag.name}</Option>*/}
                {/*                        )*/}
                {/*                    })}*/}
                {/*                </Select>*/}
                {/*            </ListItem>*/}
                {/*        </HorizontalList> : ''*/}
                {/*}*/}
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
                                                    onChange={(name) => {
                                                        let currentSlug = strToSlug(name);
                                                        let slug = formInput.slug || {};
                                                        slug[locale] = currentSlug;
                                                        setFormInput({
                                                            ...formInput,
                                                            slug
                                                        });
                                                    }}
                                                />
                                            </ListItem>
                                        </HorizontalList>
                                        <HorizontalList itemSize={ListItemSize.STRETCH}>
                                            <ListItem style={{marginRight: "1rem"}}>
                                                <Input
                                                    ref={el => formInputRef.current[`slug_${locale}`] = el}
                                                    defaultValue={getObjectTrans(formInput.slug, locale)}
                                                    label="Slug"
                                                    placeholder="Slug"
                                                    maxLength="255"
                                                    validateConditions={[{
                                                        type: ValidationType.NOT_EMPTY,
                                                        errMessage: "Bắt buộc"
                                                    }]}
                                                />
                                            </ListItem>
                                        </HorizontalList>
                                        <HorizontalList itemSize={ListItemSize.STRETCH}>
                                            <ListItem>
                                                <TextArea
                                                    ref={el => formInputRef.current[`shortDescription_${locale}`] = el}
                                                    defaultValue={getObjectTrans(formInput.shortDescription, locale)}
                                                    label="Short Description"
                                                    placeholder="Short Description"
                                                    maxLength="10000"
                                                    height="100px"
                                                />
                                            </ListItem>
                                        </HorizontalList>
                                        <HorizontalList itemSize={ListItemSize.STRETCH}>
                                            {formInput.content
                                                ? <Editor
                                                    refRoot={formInputRef}
                                                    refName={`content_${locale}`}
                                                    content={getObjectTrans(formInput.content, locale)}
                                                /> : ''
                                            }
                                        </HorizontalList>


                                        <Divider orientation="left">SEO</Divider>
                                        <HorizontalList style={{width: '50%'}}>
                                            <SingleImage
                                                name={`metaImage${locale}`}
                                                imageUrl={formInput[`metaImage${locale}Url`]}
                                                handleChange={handleChangeSingleUpload}
                                            />
                                        </HorizontalList>
                                        <HorizontalList itemSize={ListItemSize.STRETCH}>
                                            <ListItem>
                                                <TextArea
                                                    ref={el => formInputRef.current[`metaKeyword_${locale}`] = el}
                                                    defaultValue={getObjectTrans(formInput.metaKeyword, locale)}
                                                    label="Meta Keyword"
                                                    placeholder="Meta Keyword"
                                                    maxLength="1000"
                                                    height="100px"
                                                />
                                            </ListItem>
                                        </HorizontalList>
                                        <HorizontalList itemSize={ListItemSize.STRETCH}>
                                            <ListItem>
                                                <TextArea
                                                    ref={el => formInputRef.current[`metaDescription_${locale}`] = el}
                                                    defaultValue={getObjectTrans(formInput.metaDescription, locale)}
                                                    label="Meta Description"
                                                    placeholder="Meta Description"
                                                    maxLength="1000"
                                                    height="100px"
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

export default AdminPostsEditPage;
