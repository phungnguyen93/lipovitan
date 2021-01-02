import BackButton from "components/admin/BackButton";
import LayoutPage from "components/admin/LayoutPage";
import Section from "@/diginext/containers/Section";
import AdminButton, { ButtonSize } from "components/dashkit/Buttons";
import PageHeader from "components/dashkit/PageHeader";
import { Input, ValidationType, InputType, InputSelect } from "@/diginext/form/Form";
import ApiCall from "modules/ApiCall";
import { useEffect, useRef, useState } from "react";
import { Switch, Divider, Select } from "antd";
import { useRouter } from "next/router";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import { showMessages, showSuccess, showError, getFileNameFromPath, isFile, checkPermission, showNotifications } from "@/helpers/helpers";
import SingleImage from '@/diginext/upload/singleImage';
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";

export const getServerSideProps = TrackingUserSession;

const AdminUsersCreatePage = ({ user }) => {
    const router = useRouter();
    const formInputRef = useRef({});
    const [formInput, setFormInput] = useState({});
    const [roles, setRoles] = useState({});
    const [myTimeout, setMyTimeout] = useState();

    //Permissions
    const canCreate = checkPermission(user, 'user_add');
    const canRoleList = checkPermission(user, 'role_list');

    //Init load
    useEffect(function() {
        if(!canCreate || !canRoleList) {
            showNotifications(['You have no permission.'])
            router.push('/admin');
            return;
        } else {
            fetchRoles();
        }
    }, []);

    // methods
    const fetchRoles = function() {
        ApiCall({
            router,
            path: `/api/v1/admin/roles?selects=id,name&get=true&limit=999999`,
            token: user.token,
        }).then((res) => {
            if (res.status) {
                setRoles(res.data.list);
            } else {
                showError(res);
            }
        }); 
    };

    // save
    const saveHandler = function() {
        let msgs = [];
        let newPassword = formInputRef.current.newPassword.value;
        let confirmNewPassword = formInputRef.current.confirmNewPassword.value;
        let role = formInputRef.current.role.value;

        let currentFormInput = {
            name: formInputRef.current.name.value,
            email: formInputRef.current.email.value,
            active: formInput.active || false
        };

        if(!role) {
            msgs.push('The role is required.');
        }

        if(!newPassword) {
            msgs.push('The new password is required.');
        }

        if(newPassword != confirmNewPassword) {
            msgs.push('The new password confirmation does not match.');
        }

        if(msgs.length) {
            showMessages(msgs);
            return;
        }

        currentFormInput.password = newPassword;
        currentFormInput.role = role.value;

        if(formInput.profileImage && isFile(formInput.profileImage)) {
            currentFormInput.profileImage = formInput.profileImage;
        } else if(formInput.profileImage == '') {
            currentFormInput.profileImage = null;
        }

        clearTimeout(myTimeout);
        let loginTimeout = setTimeout(async function() {
            ApiCall({
                router,
                path: `/api/v1/admin/users`,
                token: user.token,
                method: 'POST',
                data: currentFormInput,
                contentType: 1
            }).then((res) => {
                if (res.status) {
                    let formInput = res.data;
                    if(typeof formInput.profileImage != 'undefined') {
                        formInput['profileImageUrl'] = formInput.profileImage;
                        formInput['profileImage'] = getFileNameFromPath(formInput.profileImage);
                    }
                    setFormInput({
                        ...formInput
                    });
                    showSuccess(res);
                    router.push('/admin/users');
                } else {
                    showError(res);
                }

                formInputRef.current.newPassword.value = '';
                formInputRef.current.confirmNewPassword.value = '';
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
   
    const header = (
        <PageHeader pretitle="Users" title="Create" button={<BackButton />} separator={true}>
            Tạo người dùng
        </PageHeader>
    );
    
    return (
        <LayoutPage header={header} user={user}>
            <Section borderBottom={true} style={{ padding: "2rem 0" }}>
                <label style={{ marginBottom: "15px" }}>Profile Image</label>
                <HorizontalList style={{width: "50%"}}>
                    <SingleImage
                        name={'profileImage'}
                        imageUrl={formInput.profileImageUrl}
                        handleChange={handleChangeSingleUpload}
                    />
                </HorizontalList>

                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <Input
                            ref={el => formInputRef.current.name = el}
                            defaultValue={formInput.name}
                            label="Name"
                            placeholder="Name"
                            maxLength="255"
                            validateConditions={[{ type: ValidationType.NOT_EMPTY, errMessage: "Bắt buộc" }]}
                        />
                    </ListItem>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <Input
                            ref={el => formInputRef.current.email = el}
                            defaultValue={formInput.email}
                            label="Email"
                            placeholder="Email"
                            maxLength="255"
                            validateConditions={[{ type: ValidationType.EMAIL, errMessage: "Không đúng định dạng email" }]}
                        />
                    </ListItem>
                </HorizontalList>
                
                {
                    roles[0]
                    ? <HorizontalList itemSize={ListItemSize.STRETCH}>
                        <ListItem style={{ marginRight: "1rem" }}>
                            <InputSelect
                                ref={el => formInputRef.current.role = el}
                                label={<label style={{ display: "inline-block" }}>Role <span style={{color: "red"}}>*</span></label>}
                                labelInValue
                                style={{ width: '50%'}}
                                defaultValue={{ label: roles[0].name, value: roles[0].id}}
                                required
                            >
                                {Object.keys(roles).map(function(index) {
                                    return(
                                    <Select.Option key={roles[index].id} value={roles[index].id}>{roles[index].name}</Select.Option>
                                    )
                                })}                            
                            </InputSelect>
                        </ListItem>
                    </HorizontalList>
                    : ''
                }

                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <div className="form-group">
                            <label style={{ marginRight: "15px" }}>Status</label>
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

                {/* Password */}
                <Divider orientation="left">Password</Divider>
                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <Input
                            ref={el => formInputRef.current.newPassword = el}
                            label="New Password"
                            type={InputType.PASSWORD}
                            minLength="6"
                            maxLength="255"
                            validateConditions={[{ type: ValidationType.NOT_EMPTY, errMessage: "Bắt buộc" }]}
                        />
                    </ListItem>
                    <ListItem>
                        <Input
                            ref={el => formInputRef.current.confirmNewPassword = el}
                            label="Confirm new password"
                            type={InputType.PASSWORD}
                            minLength="6"
                            maxLength="255"
                            validateConditions={[{ type: ValidationType.NOT_EMPTY, errMessage: "Bắt buộc" }]}
                        />
                    </ListItem>
                </HorizontalList>

                <AdminButton
                    size={ButtonSize.LARGE}
                    onClick={saveHandler}
                    style={{margin: '20px'}}
                >
                    Save changes
                </AdminButton>
            </Section>
        </LayoutPage>
    )
};

export default AdminUsersCreatePage;
