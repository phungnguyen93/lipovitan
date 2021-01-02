import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Divider } from "antd";
import PageHeader from "components/dashkit/PageHeader";
import LayoutPage from "components/admin/LayoutPage";
import Section from "@/diginext/containers/Section";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize } from "components/dashkit/Buttons";
import { Input, TextArea, ValidationType } from "@/diginext/form/Form";
import SingleImage from '@/diginext/upload/singleImage'
import ApiCall from "modules/ApiCall";
import { showSuccess, showError, getFileNameFromPath, checkPermission, showNotifications } from "@/helpers/helpers";
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";

export const getServerSideProps = TrackingUserSession;

const AdminSettingPage = ({ user }) => {
    const router = useRouter();
    const formInputRef = useRef({});
    const [formInput, setFormInput] = useState({});
    const [myTimeout, setMyTimeout] = useState();

    //Permissions
    const canList   = checkPermission(user, 'setting_list');
    const canUpdate = checkPermission(user, 'setting_update');

    //Init load
    useEffect(function() {
        if(!canList || !canUpdate) {
            showNotifications(['You have no permission.'])
            router.push('/admin');
            return;
        } else {
            fetchDetail();
        }
    }, []);

    // methods
    const fetchDetail = function() {
        ApiCall({
            router,
            path: `/api/v1/admin/setting`,
            token: user.token,
        }).then((res) => {
            if (res.status) {
                if(res.data && res.data.length > 0) {
                    let setting = {};
                    res.data.forEach(function(item) {
                        setting[item.name] = item.value;
                        if(item.name == 'metaImage') {
                            setting[item.name] = getFileNameFromPath(item.value);
                            setting[`${item.name}Url`] = item.value;
                        }
                    });
                    setFormInput({
                        ...setting
                    });
                } else {
                    setFormInput({});
                }
            } else {
                showError(res);
            }
        });
    };

    // save
    const saveHandler = function() {
        let currentFormInput = {
            branchName1: formInputRef.current.branchName1.value,
            branchAddress1: formInputRef.current.branchAddress1.value,
            branchEmail1: formInputRef.current.branchEmail1.value,
            branchName2: formInputRef.current.branchName2.value,
            branchAddress2: formInputRef.current.branchAddress2.value,
            branchEmail2: formInputRef.current.branchEmail2.value,
            behance: formInputRef.current.behance.value,
            linkedIn: formInputRef.current.linkedIn.value,
            instagram: formInputRef.current.instagram.value,
            facebook: formInputRef.current.facebook.value,
            metaDescription: formInputRef.current.metaDescription.value,
            metaKeyword: formInputRef.current.metaKeyword.value,
            metaImage: formInput.metaImage,
            headHtmlCode: formInputRef.current.headHtmlCode.value,
            bodyHtmlCode: formInputRef.current.bodyHtmlCode.value,
            footerHtmlCode: formInputRef.current.footerHtmlCode.value,
        };
       
        clearTimeout(myTimeout);
        let loginTimeout = setTimeout(async function() {
            ApiCall({
                router,
                path: `/api/v1/admin/setting`,
                token: user.token,
                method: 'PUT',
                data: currentFormInput,
                contentType: 1
            }).then((res) => {
                if (res.status) {
                    if(res.data && res.data.length > 0) {
                        let setting = {};
                        res.data.forEach(function(item) {
                            setting[item.name] = item.value;
                            if(item.name == 'metaImage') {
                                setting['metaImage'] = getFileNameFromPath(item.value);
                                setting[`${item.name}Url`] = item.value;
                            }
                        });
                        setFormInput({
                            ...setting
                        });
                    }
                    showSuccess(res);
                } else {
                    showError(res);
                }
            });
        }, 1000);
        setMyTimeout(loginTimeout);
    }

    //Single Upload
    const handleChangeSingleUpload = function(type, data) {
        setFormInput({
            ...formInput,
            ...data
        });
    };
    
    // Embed Component
    const header = (
        <PageHeader pretitle="admin" title="Settings" separator={true}>
        Thông tin cài đặt hệ thống.
        </PageHeader>
    );

    return (
        <LayoutPage header={header} user={user}>
            <Section borderBottom={true} style={{ padding: "2rem 0" }}>
                {/* Branch Info */}
                <Divider orientation="left">Branch Informations</Divider>
                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <Input
                            ref={el => formInputRef.current.branchName1 = el}
                            defaultValue={formInput.branchName1}
                            label="First Branch Name"
                            placeholder="Name"
                            maxLength="255" 
                        />
                    </ListItem>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <Input
                            ref={el => formInputRef.current.branchAddress1 = el}
                            defaultValue={formInput.branchAddress1}
                            label="First Branch Address"
                            placeholder="Address"
                            maxLength="255"
                        />
                    </ListItem>
                    <ListItem>
                        <Input
                            ref={el => formInputRef.current.branchEmail1 = el}
                            defaultValue={formInput.branchEmail1}
                            label="First Branch Email"
                            placeholder="Email"
                            maxLength="255" 
                            validateConditions={[{ type: ValidationType.EMAIL, errMessage: "Không đúng định dạng email" }]} 
                        />
                    </ListItem>
                </HorizontalList>
                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <Input
                            ref={el => formInputRef.current.branchName2 = el}
                            defaultValue={formInput.branchName2}
                            label="Second Branch Name"
                            placeholder="Name"
                            maxLength="255"
                        />
                    </ListItem>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <Input
                            ref={el => formInputRef.current.branchAddress2 = el}
                            defaultValue={formInput.branchAddress2}
                            label="Second Branch Address"
                            placeholder="Address"
                            maxLength="255"
                        />
                    </ListItem>
                    <ListItem>
                        <Input
                            ref={el => formInputRef.current.branchEmail2 = el}
                            defaultValue={formInput.branchEmail2}
                            label="Second Branch Email"
                            placeholder="Email"
                            maxLength="255" 
                            validateConditions={[{ type: ValidationType.EMAIL, errMessage: "Không đúng định dạng email" }]} 
                        />
                    </ListItem>
                </HorizontalList>

                {/* Social Links */}
                <Divider orientation="left">Social Links</Divider>
                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <Input
                            ref={el => formInputRef.current.behance = el}
                            defaultValue={formInput.behance}
                            label="Behance Link"
                            placeholder="Link"
                            maxLength="255"
                        />
                    </ListItem>
                    <ListItem>
                        <Input
                            ref={el => formInputRef.current.linkedIn = el}
                            defaultValue={formInput.linkedIn}
                            label="LinkedIn Link"
                            placeholder="Link"
                            maxLength="255"
                        />
                    </ListItem>
                </HorizontalList>
                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <Input
                            ref={el => formInputRef.current.instagram = el}
                            defaultValue={formInput.instagram}
                            label="Instagram Link"
                            placeholder="Link"
                            maxLength="255"
                        />
                    </ListItem>
                    <ListItem>
                        <Input
                            ref={el => formInputRef.current.facebook = el}
                            defaultValue={formInput.facebook}
                            label="Facebook Link"
                            placeholder="Link"
                            maxLength="255"
                        />
                    </ListItem>
                </HorizontalList>

                {/* SEO */}
                <Divider orientation="left">SEO</Divider>
                <label style={{ marginBottom: "15px" }}>SEO Image</label>
                <HorizontalList style={{width: '50%'}}>
                    <SingleImage
                        name={'metaImage'}
                        imageUrl={formInput.metaImageUrl}
                        handleChange={handleChangeSingleUpload}
                    />
                </HorizontalList>
                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <TextArea
                            ref={el => formInputRef.current.metaKeyword = el}
                            defaultValue={formInput.metaKeyword}
                            label="SEO Keywords"
                            placeholder="Keywords"
                            maxLength="1000"
                            height="100px"
                        />
                    </ListItem>
                </HorizontalList>
                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem>
                        <TextArea
                            ref={el => formInputRef.current.metaDescription = el}
                            defaultValue={formInput.metaDescription}
                            label="SEO Description"
                            placeholder="Description"
                            maxLength="1000"
                            height="100px"
                        />
                    </ListItem>
                </HorizontalList>

                {/* HTML CODE */}
                <Divider orientation="left">HTML CODE</Divider>
                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem>
                        <TextArea
                            ref={el => formInputRef.current.headHtmlCode = el}
                            defaultValue={formInput.headHtmlCode}
                            label="HEAD HTML CODE"
                            placeholder=""
                            maxLength="1000"
                            height="100px"
                        />
                    </ListItem>
                </HorizontalList>

                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem>
                        <TextArea
                            ref={el => formInputRef.current.bodyHtmlCode = el}
                            defaultValue={formInput.bodyHtmlCode}
                            label="BODY HTML CODE"
                            placeholder=""
                            maxLength="1000"
                            height="100px"
                        />
                    </ListItem>
                </HorizontalList>

                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem>
                        <TextArea
                            ref={el => formInputRef.current.footerHtmlCode = el}
                            defaultValue={formInput.footerHtmlCode}
                            label="FOOTER HTML CODE"
                            placeholder=""
                            maxLength="1000"
                            height="100px"
                        />
                    </ListItem>
                </HorizontalList>

                
                <AdminButton
                    size={ButtonSize.LARGE}
                    onClick={saveHandler}
                >
                    Save changes
                </AdminButton>
            </Section>
        </LayoutPage>
    );
};

export default AdminSettingPage;
