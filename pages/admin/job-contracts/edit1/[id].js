import BackButton from "components/admin/BackButton";
import LayoutPage from "components/admin/LayoutPage";
import Section from "@/diginext/containers/Section";
import PageHeader from "components/dashkit/PageHeader";
import { useEffect, useState } from "react";
import { Button, Card, Tabs } from "antd";
import { useRouter } from "next/router";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import { showError, showMessages, showSuccess } from "@/helpers/helpers";
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { putJobContract } from "modules/mock/api/job-contracts";
import { defaultLocale, locales } from "@/constants/locale";
import ApiCall from "../../../../modules/ApiCall";
import { Input, ValidationType } from "@/diginext/form/Form";
import { validateJobContractEdit } from "../../../../modules/mock/validations/job-contracts";

export const getServerSideProps = TrackingUserSession;

const {TabPane} = Tabs;

const JobContractEdit1 = ({user}) => {

    const initialForm = {
        // image: null,
        active: true,
        name: {
            en: '',
            vi: ''
        }
    };

    const router = useRouter();
    const {id} = router.query;
    const [formInput, setFormInput] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(function () {

        fetchDetail();
        // return () => {
        // }
    }, []);

    const fetchDetail = function () {
        ApiCall({
            router,
            path: `/api/v1/admin/job-contracts/${id}`,
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

    // const fetchDetail = function () {
    //     if (response.status !== true) {
    //         showError(response);
    //         router.push('/admin/job-contracts');
    //     }
    //
    //     // const {image, name, active} = response.data;
    //     const {name, active} = response.data;
    //
    //     setFormEdit({
    //         ...formEdit,
    //         name,
    //         active
    //     });
    //     // setImageUrl(image);
    // };

    // const handleChangeImage = (info) => {
    //     if (info.file.status === 'uploading') {
    //         setLoading(true);
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         getBase64(info.file.originFileObj, imageUrl => {
    //             setFormInput({
    //                 ...formInput,
    //                 image: info.file.originFileObj
    //             });
    //             setImageUrl(imageUrl);
    //             setLoading(false);
    //         });
    //     }
    // };

    const onSubmit = async () => {
        const errors = validateJobContractEdit(formInput);
        if (errors.length > 0) {
            showMessages(errors);
            return false;
        }

        setFormLoading(true);
        const response = await putJobContract(id, formInput, user.token);
        setFormLoading(false);

        if (response.status !== true) {
            showError(response);
            return false;
        }

        // setFormInput({...initialForm});
        showSuccess(response);

        // router.push('/admin/job-contracts');
    };

    const header = (
        <PageHeader title="Edit Contract" button={<BackButton/>} separator={true}/>
    );

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    return (
        <LayoutPage header={header} user={user}>
            <Section borderBottom={true} style={{padding: "2rem 0"}}>

                {/*<HorizontalList itemSize={ListItemSize.STRETCH}>*/}
                {/*    <ListItem>*/}
                {/*        <label style={{marginBottom: "1rem"}}>Image <RequiredSymbol/></label>*/}
                {/*        <Upload*/}
                {/*            accept="image/*"*/}
                {/*            name="image"*/}
                {/*            listType="picture-card"*/}
                {/*            className="avatar-uploader"*/}
                {/*            showUploadList={false}*/}
                {/*            onChange={handleChangeImage}*/}
                {/*        >*/}
                {/*            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}*/}
                {/*        </Upload>*/}
                {/*    </ListItem>*/}

                {/*    <ListItem>*/}
                {/*        <label style={{marginBottom: "1rem"}}>Active </label>*/}
                {/*        <Switch*/}
                {/*            checked={formInput.active}*/}
                {/*            onChange={() => setFormInput({*/}
                {/*                ...formInput,*/}
                {/*                active: !formInput.active*/}
                {/*            })}*/}
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
                                                <Card title={locales[locale]}>
                                                    <Input
                                                        defaultValue={formInput.name[locale]}
                                                        label="Name"
                                                        placeholder="Name"
                                                        maxLength="255"
                                                        onChange={event => {
                                                            console.log(event.target);
                                                            if (event.target) {
                                                                setFormInput({
                                                                    ...formInput,
                                                                    name: {
                                                                        ...formInput.name,
                                                                        [locale]: event.target.value
                                                                    }
                                                                })
                                                            }
                                                        }}
                                                        validateConditions={[{
                                                            type: ValidationType.NOT_EMPTY,
                                                            errMessage: "Bắt buộc"
                                                        }]}
                                                    />
                                                </Card>
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
                    onClick={onSubmit}
                    loading={formLoading}>
                    Save
                </Button>
            </Section>
        </LayoutPage>
    )
};

export default JobContractEdit1;
