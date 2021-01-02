import BackButton from "components/admin/BackButton";
import LayoutPage from "components/admin/LayoutPage";
import Section from "@/diginext/containers/Section";
import PageHeader from "components/dashkit/PageHeader";
import { useState } from "react";
import { Button, Card, Input, Switch, Tabs } from "antd";
import { useRouter } from "next/router";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import { getBase64, showError, showMessages, showSuccess } from "@/helpers/helpers";
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { postJobContract } from "modules/mock/api/job-contracts";
import RequiredSymbol from "components/website/utils/RequiredSymbol";
import { defaultLocale, locales } from "@/constants/locale";
import { validateJobContractCreate } from "../../../modules/mock/validations/job-contracts";

const {TabPane} = Tabs;

export const getServerSideProps = TrackingUserSession;

const ProductColorCreate = ({user}) => {

    const initialForm = {
        // image: null,
        active: true,
        name: {
            en: '',
            vi: ''
        }
    };

    const router = useRouter();
    const [formCreate, setFormCreate] = useState({...initialForm});
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const handleChangeImage = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setFormCreate({
                    ...formCreate,
                    image: info.file.originFileObj
                });
                setImageUrl(imageUrl);
                setLoading(false);
            });
        }
    };

    const onSubmit = async () => {

        const errors = validateJobContractCreate(formCreate);
        if (errors.length > 0) {
            showMessages(errors);
            return false;
        }

        setFormLoading(true);
        const response = await postJobContract(formCreate, user.token);
        setFormLoading(false);

        if (response.status !== true) {
            showError(response);
            return false;
        }

        setFormCreate({...initialForm});
        showSuccess(response);

        router.push('/admin/job-contracts');
    };

    const header = (
        <PageHeader title="Create Contract" button={<BackButton/>} separator={true}/>
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

                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    {/*<ListItem>*/}
                    {/*    <label style={{marginBottom: "1rem"}}>Image <RequiredSymbol/></label>*/}
                    {/*    <Upload*/}
                    {/*        accept="image/*"*/}
                    {/*        name="image"*/}
                    {/*        listType="picture-card"*/}
                    {/*        className="avatar-uploader"*/}
                    {/*        showUploadList={false}*/}
                    {/*        onChange={handleChangeImage}*/}
                    {/*    >*/}
                    {/*        {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}*/}
                    {/*    </Upload>*/}
                    {/*</ListItem>*/}

                    <ListItem>
                        <label style={{marginBottom: "1rem"}}>Active </label>
                        <Switch
                            defaultChecked={formCreate.active}
                            onChange={() => setFormCreate({
                                ...formCreate,
                                active: !formCreate.active
                            })}
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
                                                <Card title={locales[locale]}>
                                                    <label>Name <RequiredSymbol/></label>
                                                    <Input
                                                        defaultValue={formCreate.name[locale]}
                                                        onChange={event => setFormCreate({
                                                            ...formCreate,
                                                            name: {
                                                                ...formCreate.name,
                                                                [locale]: event.target.value
                                                            }
                                                        })}
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
                    Save changes
                </Button>
            </Section>
        </LayoutPage>
    )
};

export default ProductColorCreate;
