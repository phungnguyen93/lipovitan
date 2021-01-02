import BackButton from "components/admin/BackButton";
import LayoutPage from "components/admin/LayoutPage";
import Section from "@/diginext/containers/Section";
import PageHeader from "@/dashkit/PageHeader";
import { Input, InputSelect, ValidationType, TextArea as TextAreaTop } from "@/diginext/form/Form";
import ApiCall from "modules/ApiCall";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Divider, Form, Input as InputAnt, Popconfirm, Select, Switch, Table, Tabs } from "antd";
import { useRouter } from "next/router";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import { checkPermission, showError, showMessages, showNotifications, showSuccess, isFile, getFileNameFromPath } from "@/helpers/helpers";
import { getObjectTrans } from "@/helpers/translation";
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";
import { defaultLocale, locales } from "@/constants/locale";
import SingleImage from "@/diginext/upload/singleImage";

const {TabPane} = Tabs;

export const getServerSideProps = TrackingUserSession;

const {TextArea} = InputAnt;

const JobEdit = ({user}) => {
    const router = useRouter();
    const formInputRef = useRef({});
    const [formInput, setFormInput] = useState({});
    const [myTimeout, setMyTimeout] = useState();
    const [jobLocation, setJobLocation] = useState([]);
    const [jobContract, setJobContract] = useState([]);
    const [jobDepartment, setJobDepartment] = useState([]);
    const [formLoading, setFormLoading] = useState(false);
    const {id} = router.query;

    const [content, setContent] = useState({
        vi: {
            dataSource: [

            ],
            count: 0,
        },
        en: {
            dataSource: [

            ],
            count: 0,
        }
    });

    const dataSource_en = content.en.dataSource;
    const dataSource_vi = content.vi.dataSource;

    //Permissions
    const canEdit = checkPermission(user, 'job_edit');
    const canDetail = checkPermission(user, 'job_detail');

    const canJobDepartmentList = checkPermission(user, 'job_department_list');
    const canJobContractList = checkPermission(user, 'contract_list');
    const canJobLocationList = checkPermission(user, 'job_location_list');

    const EditableContext = React.createContext();

    let columns_en = [
        {
            title: 'Title',
            dataIndex: 'name',
            editable: true,
            type: 1, // Input
            locale: 'en',
        },
        {
            title: 'Content',
            dataIndex: 'info',
            width: '30%',
            editable: true,
            type: 2, // Textarea
            locale: 'en',
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            locale: 'en',
            render: (text, record) =>
                content.en.dataSource.length >= 1 ? (
                    // <Popconfirm title="Sure to delete?" onConfirm={}>
                        <a onClick={() => handleDelete(record.key, 'en')}>Delete</a>
                    // </Popconfirm>
                ) : null
        },
    ];

    let columns_vi = [
        {
            title: 'Title',
            dataIndex: 'name',
            editable: true,
            type: 1, // Input
            locale: 'vi',
        },
        {
            title: 'Content',
            dataIndex: 'info',
            width: '30%',
            editable: true,
            type: 2, // Textarea
            locale: 'vi',
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            locale: 'vi',
            render: (text, record) =>
                content.vi.dataSource.length >= 1 ? (
                    // <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key, 'vi')}>
                        <a onClick={() => handleDelete(record.key, 'vi')}>Delete</a>
                    // </Popconfirm>
                ) : null
        },
    ];

    columns_en = columns_en.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                type: col.type,
                locale: col.locale,
                handleSave: handleSave,
            }),
        };
    });

    columns_vi = columns_vi.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                type: col.type,
                locale: col.locale,
                handleSave: handleSave,
            }),
        };
    });

    const EditableRow = ({index, ...props}) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell = ({
                              title,
                              editable,
                              children,
                              dataIndex,
                              record,
                              handleSave,
                              ...restProps
                          }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef();
        const form = useContext(EditableContext);

        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({[dataIndex]: record[dataIndex]});
        };

        const save = async e => {
            const locale = e.target.getAttribute('locale');
            try {
                const values = await form.validateFields();

                toggleEdit();
                handleSave({...record, ...values, locale });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        const {type, locale} = restProps;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{margin: 0}}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    {
                        type === 1 ? <InputAnt ref={inputRef} onPressEnter={save} onBlur={save} locale={locale}/> :
                            <TextArea rows={4} ref={inputRef} onBlur={save} locale={locale}/>
                    }
                </Form.Item>
            ) : (
                <div className="editable-cell-value-wrap" style={{paddingRight: 24}} onClick={toggleEdit}>
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const handleDelete = (key, locale) => {
        const dataSource = [...content[locale].dataSource];
        setContent({
            ...content,
            [locale]: {
                ...content[locale],
                dataSource: dataSource.filter(item => item.key !== key)
            }
        });
    };

    const handleAdd = (locale) => {
        const {count, dataSource} = content[locale];
        const newData = {
            key: count,
            name: '',
            info: '',
        };
        setContent({
            ...content,
            [locale]: {
                dataSource: [...dataSource, newData],
                count: +count + 1,
            }
        });
    };

    const handleSave = row => {
        const newData = [...content[row['locale']].dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });

        setContent({
            ...content,
            [row['locale']]: {
                ...content[row['locale']],
                dataSource: newData
            }
        });
    };

    //Init load
    useEffect(function () {
        if (!canEdit || !canDetail) {
            showNotifications(['You have no permission.']);
            router.push('/admin');

        } else {
            fetchDetail();
            if (canJobDepartmentList) {
                fetchDepartments();
            }
            if (canJobContractList) {
                fetchContracts();
            }
            if (canJobLocationList) {
                fetchLocations();
            }
        }
    }, []);

    // methods
    const fetchDetail = function () {
        ApiCall({
            router,
            path: `/api/v1/admin/jobs/${id}`,
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
                setContent(formInput.content);
            } else {
                showError(res);
            }
        });
    };

    const fetchDepartments = function () {
        ApiCall({
            router,
            path: `/api/v1/admin/job-departments?get=true`,
            token: user.token,
        }).then((res) => {
            if (res.status && res.data) {
                setJobDepartment(res.data);
            } else {
                setJobDepartment([]);
                showError(res);
            }
        });
    };

    const fetchContracts = function () {
        ApiCall({
            router,
            path: `/api/v1/admin/job-contracts?get=true`,
            token: user.token,
        }).then((res) => {
            if (res.status && res.data) {
                setJobContract(res.data);
            } else {
                setJobContract([]);
                showError(res);
            }
        });
    };

    const fetchLocations = function () {
        ApiCall({
            router,
            path: `/api/v1/admin/job-locations?get=true`,
            token: user.token,
        }).then((res) => {
            if (res.status && res.data) {
                setJobLocation(res.data);
            } else {
                setJobLocation([]);
                showError(res);
            }
        });
    };

    // save
    const saveHandler = function () {
        let msgs = [];

        let currentFormInput = {
            // sortOrder: formInputRef.current.sortOrder.value,
            jobLocation: formInputRef.current.jobLocation.value.value,
            jobContract: formInputRef.current.jobContract.value.value,
            jobDepartment: formInputRef.current.jobDepartment.value.value,
            quantity: +formInputRef.current.quantity.value,
            active: formInput.active || false,
            name: {
                vi: formInputRef.current['name_vi'].value,
                en: formInputRef.current['name_en'].value
            },
            content,
            // slug: {
            //     vi: formInputRef.current['slug_vi'].value,
            //     en: formInputRef.current['slug_en'].value
            // },
            // shortDescription: {
            //     vi: formInputRef.current['shortDescription_vi'].value,
            //     en: formInputRef.current['shortDescription_en'].value
            // },
            // content: {
            //     vi: formInputRef.current['content_vi'].editor.getData(),
            //     en: formInputRef.current['content_en'].editor.getData()
            // },
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

        // if (formInput.tagNames && formInput.tagNames.length > 0) {
        //     currentFormInput['tags'] = formInput.tagNames;
        // }
        //
        // if (formInput.image && isFile(formInput.image)) {
        //     currentFormInput.image = formInput.image;
        // } else if (formInput.image == '') {
        //     currentFormInput.image = null;
        // }
        //
        // if (formInput.imageMb && isFile(formInput.imageMb)) {
        //     currentFormInput.imageMb = formInput.imageMb;
        // } else if (formInput.imageMb == '') {
        //     currentFormInput.imageMb = null;
        // }
        //
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
            console.log(currentFormInput);
            ApiCall({
                router,
                path: `/api/v1/admin/jobs/${id}`,
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
                    router.push('/admin/jobs');
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
        <PageHeader pretitle="Job" title="Update Job" button={<BackButton/>} separator={true}>
        </PageHeader>
    );

    return (
        <LayoutPage header={header} user={user}>
            <Section borderBottom={true} style={{padding: "2rem 0"}}>

                {/*<HorizontalList style={{width: '50%'}}>*/}
                {/*    <SingleImage*/}
                {/*        name={`image`}*/}
                {/*        imageUrl={formInput[`imageUrl`]}*/}
                {/*        label={'Thumbnail'}*/}
                {/*        handleChange={handleChangeSingleUpload}*/}
                {/*    />*/}
                {/*</HorizontalList>*/}

                {/*<HorizontalList style={{width: '50%'}}>*/}
                {/*    <SingleImage*/}
                {/*        name={`imageMb`}*/}
                {/*        imageUrl={formInput[`imageMbUrl`]}*/}
                {/*        label={'Thumbnail Mobile'}*/}
                {/*        handleChange={handleChangeSingleUpload}*/}
                {/*    />*/}
                {/*</HorizontalList>*/}
                {
                    jobLocation.length && formInput.jobLocation
                        ? <HorizontalList itemSize={ListItemSize.STRETCH}>
                            <ListItem style={{marginRight: "1rem"}}>
                                <InputSelect
                                    ref={el => formInputRef.current.jobLocation = el}
                                    label={<label style={{display: "inline-block"}}>Location <span
                                        style={{color: "red"}}>*</span></label>}
                                    labelInValue
                                    defaultValue={{value: formInput.jobLocation || jobLocation[0].id}}
                                    style={{width: '50%'}}
                                >
                                    {Object.keys(jobLocation).map(function (index) {
                                        return (
                                            <Select.Option key={jobLocation[index].id}
                                                           value={jobLocation[index].id}>{getObjectTrans(jobLocation[index].name)}</Select.Option>
                                        )
                                    })}
                                </InputSelect>
                            </ListItem>
                        </HorizontalList>
                        : ''
                }
                {
                    jobContract.length && formInput.jobContract
                        ? <HorizontalList itemSize={ListItemSize.STRETCH}>
                            <ListItem style={{marginRight: "1rem"}}>
                                <InputSelect
                                    ref={el => formInputRef.current.jobContract = el}
                                    label={<label style={{display: "inline-block"}}>Contract <span
                                        style={{color: "red"}}>*</span></label>}
                                    labelInValue
                                    defaultValue={{value: formInput.jobContract || jobContract[0].id}}
                                    style={{width: '50%'}}
                                >
                                    {
                                        jobContract.map(function (item) {
                                            return (
                                                <Select.Option key={item.id}
                                                               value={item.id}>{getObjectTrans(item.name)}</Select.Option>
                                            )
                                        })
                                    }
                                </InputSelect>
                            </ListItem>
                        </HorizontalList>
                        : ''
                }
                {
                    jobDepartment.length && formInput.jobDepartment
                        ? <HorizontalList itemSize={ListItemSize.STRETCH}>
                            <ListItem style={{marginRight: "1rem"}}>
                                <InputSelect
                                    ref={el => formInputRef.current.jobDepartment = el}
                                    label={<label style={{display: "inline-block"}}>Department <span
                                        style={{color: "red"}}>*</span></label>}
                                    labelInValue
                                    defaultValue={{value: formInput.jobDepartment || jobDepartment[0].id}}
                                    style={{width: '50%'}}
                                >
                                    {
                                        jobDepartment.map(function (item) {
                                            return (
                                                <Select.Option key={item.id}
                                                               value={item.id}>{getObjectTrans(item.name)}</Select.Option>
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

                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem style={{marginRight: "1rem"}}>
                        <Input
                            ref={el => formInputRef.current.quantity = el}
                            defaultValue={formInput.quantity}
                            label="Quantity"
                            placeholder="0"
                            maxLength="255"
                            validateConditions={[
                                {type: ValidationType.NUMBERS, errMessage: "Phải là số"}
                            ]}
                        />
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
                                                    // onChange={(name) => {
                                                    //     let currentSlug = strToSlug(name);
                                                    //     let slug = formInput.slug || {};
                                                    //     slug[locale] = currentSlug;
                                                    //     setFormInput({
                                                    //         ...formInput,
                                                    //         slug
                                                    //     });
                                                    // }}
                                                />
                                            </ListItem>
                                        </HorizontalList>

                                        <div>
                                            <Button onClick={() => handleAdd(locale)} type="primary"
                                                    style={{marginBottom: 16}}>
                                                Add a row
                                            </Button>
                                            {
                                                locale === 'vi' ?
                                                    <Table
                                                        components={components}
                                                        rowClassName={() => 'editable-row'}
                                                        bordered
                                                        pagination={false}
                                                        dataSource={dataSource_vi}
                                                        columns={columns_vi}
                                                    />
                                                    :
                                                    <Table
                                                        components={components}
                                                        rowClassName={() => 'editable-row'}
                                                        bordered
                                                        pagination={false}
                                                        dataSource={dataSource_en}
                                                        columns={columns_en}
                                                    />
                                            }
                                        </div>

                                        {/*<HorizontalList itemSize={ListItemSize.STRETCH}>*/}
                                        {/*    <ListItem style={{marginRight: "1rem"}}>*/}
                                        {/*        <Input*/}
                                        {/*            ref={el => formInputRef.current[`slug_${locale}`] = el}*/}
                                        {/*            defaultValue={getObjectTrans(formInput.slug, locale)}*/}
                                        {/*            label="Slug"*/}
                                        {/*            placeholder="Slug"*/}
                                        {/*            maxLength="255"*/}
                                        {/*            validateConditions={[{*/}
                                        {/*                type: ValidationType.NOT_EMPTY,*/}
                                        {/*                errMessage: "Bắt buộc"*/}
                                        {/*            }]}*/}
                                        {/*        />*/}
                                        {/*    </ListItem>*/}
                                        {/*</HorizontalList>*/}
                                        {/*<HorizontalList itemSize={ListItemSize.STRETCH}>*/}
                                        {/*    <ListItem>*/}
                                        {/*        <TextArea*/}
                                        {/*            ref={el => formInputRef.current[`shortDescription_${locale}`] = el}*/}
                                        {/*            defaultValue={getObjectTrans(formInput.shortDescription, locale)}*/}
                                        {/*            label="Short Description"*/}
                                        {/*            placeholder="Short Description"*/}
                                        {/*            maxLength="10000"*/}
                                        {/*            height="100px"*/}
                                        {/*        />*/}
                                        {/*    </ListItem>*/}
                                        {/*</HorizontalList>*/}
                                        {/*<HorizontalList itemSize={ListItemSize.STRETCH}>*/}
                                        {/*    {formInput.content*/}
                                        {/*        ? <Editor*/}
                                        {/*            refRoot={formInputRef}*/}
                                        {/*            refName={`content_${locale}`}*/}
                                        {/*            content={getObjectTrans(formInput.content, locale)}*/}
                                        {/*        /> : ''*/}
                                        {/*    }*/}
                                        {/*</HorizontalList>*/}


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
                                                <TextAreaTop
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
                                                <TextAreaTop
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

export default JobEdit;
