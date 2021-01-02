import BackButton from "components/admin/BackButton";
import LayoutPage from "components/admin/LayoutPage";
import Section from "@/diginext/containers/Section";
import AdminButton, { ButtonSize } from "components/dashkit/Buttons";
import PageHeader from "components/dashkit/PageHeader";
import { Input, ValidationType } from "@/diginext/form/Form";
import ApiCall from "modules/ApiCall";
import { useEffect, useRef, useState } from "react";
import { Checkbox, Switch } from "antd";
import { useRouter } from "next/router";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import { showSuccess, showError, checkPermission, showNotifications } from "@/helpers/helpers";
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";

export const getServerSideProps = TrackingUserSession;

const AdminRolesEditPage = ({ user }) => {
    const router = useRouter();
    const formInputRef = useRef({});
    const [formInput, setFormInput] = useState({});
    const [permissions, setPermissions] = useState({});
    const [myTimeout, setMyTimeout] = useState();
    const { id } = router.query

    //Permissions
    const canEdit   = checkPermission(user, 'role_edit');
    const canDetail = checkPermission(user, 'role_detail');

    //Init load
    useEffect(function() {
        if(!canEdit || !canDetail) {
            showNotifications(['You have no permission.'])
            router.push('/admin');
            return;
        } else {
            fetchPermission();
            fetchDetail();
        }
    }, []);

    // methods
    const fetchDetail = function() {
        ApiCall({
            router,
            path: `/api/v1/admin/roles/${id}`,
            token: user.token,
        }).then((res) => {
            if (res.status) {
                setFormInput(res.data);
            } else {
                showError(res);
            }
        }); 
    };

    const fetchPermission = function() {
        ApiCall({
            router,
            path: `/api/v1/admin/permissions`,
            token: user.token,
        }).then((res) => {
            if (res.status) {
                setPermissions(res.data);
            } else {
                showError(res);
            }
        });
    };

    // save
    const saveHandler = function() {
        let currentFormInput = {
            name: formInputRef.current.name.value,
            isAdmin: formInput.isAdmin || false,
            permissions: formInput.permissions || {},
        };
        clearTimeout(myTimeout);
        let loginTimeout = setTimeout(async function() {
            ApiCall({
                router,
                path: `/api/v1/admin/roles/${id}`,
                token: user.token,
                method: 'PUT',
                data: currentFormInput,
            }).then((res) => {
                if (res.status) {
                    setFormInput({
                        ...res.data
                    });
                    showSuccess(res);
                    router.push('/admin/roles');
                } else {
                    showError(res);
                }
            });
        }, 1000);
        setMyTimeout(loginTimeout);
    }
   
    const header = (
        <PageHeader pretitle="Roles" title="Update" button={<BackButton />} separator={true}>
            Cập nhật vai trò
        </PageHeader>
    );

    return (
        <LayoutPage header={header} user={user}>
            <Section borderBottom={true} style={{ padding: "2rem 0" }}>
                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <Input
                            ref={el => formInputRef.current.name = el}
                            defaultValue={formInput.name}
                            label="Name"
                            placeholder="Name"
                            maxLength="255"
                            style={{width: "50%"}}
                            validateConditions={[{ type: ValidationType.NOT_EMPTY, errMessage: "Bắt buộc" }]}
                        />
                    </ListItem>
                </HorizontalList>
                <HorizontalList itemSize={ListItemSize.STRETCH}>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <div className="form-group">
                            <label style={{ marginRight: "15px" }}>isAdmin</label>
                            <Switch
                                checked={formInput.isAdmin}
                                onChange={() => {
                                    setFormInput({
                                        ...formInput,
                                        isAdmin: !formInput.isAdmin
                                    })
                                }}
                            />
                        </div>
                    </ListItem>
                </HorizontalList>
            </Section>
            <Section borderBottom={true} style={{ padding: "2rem 0" }}>
                <h3 style={{ marginBottom: "15px" }}>Permissions </h3>
                {permissions ? Object.keys(permissions).map((index) => {
                    return (
                        <React.Fragment key={index}>
                            <h4 style={{ marginBottom: "15px" }}>{permissions[index]['group']}</h4>
                            <HorizontalList itemSize={ListItemSize.STRETCH}>
                                {Object.keys(permissions[index]['items']).map(function(indexPermission) {
                                    return (
                                        <React.Fragment key={indexPermission}>
                                            <Checkbox
                                                checked={
                                                    (formInput.permissions && formInput.permissions[indexPermission] || 0) == 1
                                                    ? true : false
                                                }
                                                onChange={(e) => {
                                                    let permissions = formInput.permissions || {};
                                                    if(e.target.checked) {
                                                        permissions[indexPermission] = 1;
                                                        setFormInput({
                                                            ...formInput,
                                                            permissions
                                                        })
                                                    } else {
                                                        delete permissions[indexPermission];
                                                        setFormInput({
                                                            ...formInput,
                                                            permissions
                                                        });
                                                    }
                                                }}
                                                value={indexPermission}
                                            >{permissions[index]['items'][indexPermission]}
                                            </Checkbox>
                                        </React.Fragment>
                                    );
                                })}
                            </HorizontalList>
                        </React.Fragment>
                    );
                }) : ''}
                
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

export default AdminRolesEditPage;
