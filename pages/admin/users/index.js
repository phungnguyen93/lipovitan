import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import PageHeader from "components/dashkit/PageHeader";
import LayoutPage from "components/admin/LayoutPage";
import { Popconfirm } from "antd";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize, ButtonType } from "components/dashkit/Buttons";
import { Table, Divider, Select } from "antd";
import BlockSplitter from "@/diginext/elements/BlockSplitter";
import { Input, InputSelect } from "@/diginext/form/Form";
import Card from "@/diginext/containers/Card";
import ApiCall from "modules/ApiCall";
import AdminBadge from "components/dashkit/Badges";
import AppLink from "@/diginext/link/AppLink";
import AdminIcon from "components/dashkit/Icon";
import { DefaultStyles } from "components/admin/layout/AdminGlobalStyle";
import { showSuccess, showError, checkPermission, showNotifications } from "@/helpers/helpers";
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";

export const getServerSideProps = TrackingUserSession;

const AdminUsersPage = ({user, children}) => {
    const router = useRouter();
    const formSearchRef = useRef({});
    const [myTimeout, setMyTimeout] = useState();
    const [tableData, setTableData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [sorter, setSorter] = useState({});
    const [filter, setFilter] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectionType, setSelectionType] = useState("checkbox");

    //Permissions
    const canList = checkPermission(user, 'user_list');
    const canCreate = checkPermission(user, 'user_add');
    const canEdit = checkPermission(user, 'user_edit');
    const canDetail = checkPermission(user, 'user_detail');
    const canDelete = checkPermission(user, 'user_delete');

    //Init load
    useEffect(function () {
        if (!canList) {
            showNotifications(['You have no permission.']);
            router.push('/admin');

        } else {
            fetchList();
        }
    }, []);

    //Methods
    const fetchList = function (pagination = null, filters = null, sorter = null) {
        let limit = pagination == null ? 10 : pagination.pageSize;
        let page = pagination == null ? 1 : pagination.current;
        let orderBy = sorter == null ? 'id' : sorter.field;
        let order = sorter == null ? -1 : (sorter.order == 'ascend' ? 1 : -1);
        let filtera = typeof filters == 'string' ? filters : filter;
        ApiCall({
            router,
            path: `/api/v1/admin/users?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}&${filtera}`,
            token: user.token,
        }).then((res) => {
            if (res.status && res.data.list) {
                setTableData(res.data.list);
                setPagination({
                    current: res.data.currentPage,
                    pageSize: res.data.limit,
                    pageSizeOptions: [10, 20, 50],
                    showSizeChanger: true,
                    showTitle: true,
                    total: res.data.total
                });
                setSorter({
                    field: orderBy,
                    order: order
                });
                setFilter(filtera);
            } else {
                setTableData([]);
                setPagination({});
                setSorter({});
                setFilter();
                showError(res);
            }
        });
    };

    const handleDeleteOne = function (id) {
        ApiCall({
            router,
            path: `/api/v1/admin/users/${id}`,
            method: "DELETE",
            token: user.token,
        }).then((res) => {
            if (res.status) {
                showSuccess(res);
                fetchList(pagination, filter, sorter);
            } else {
                showError(res);
            }
        });
    };

    const handleDeleteMany = async function () {
        await selectedRowKeys.forEach(async function (id) {
            await handleDeleteOne(id);
        });
    };

    const handleSearch = function (isRest = false) {
        let currentFilter = '';
        let currentFormSearch = {
            name: formSearchRef.current.name.value,
            email: formSearchRef.current.email.value,
            active: formSearchRef.current.active.value.value,
        };

        Object.keys(currentFormSearch).forEach(function (index) {
            currentFilter += `${index}=${currentFormSearch[index]}&`;
        });

        if (isRest) {
            currentFilter = '';
            formSearchRef.current.name.value = '';
            formSearchRef.current.email.value = '';
            formSearchRef.current.active.value = '';
        }

        clearTimeout(myTimeout);
        let loginTimeout = setTimeout(async function () {
            fetchList(pagination, currentFilter, sorter);
        }, 1000);
        setMyTimeout(loginTimeout);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            sorter: true,
            sortDirections: ["ascend", "descend"],
            render: (name, row, index) => {
                if (canDetail && canEdit) {
                    return <AppLink href={`/admin/users/edit/${row.id}`}>{name}</AppLink>;
                } else {
                    return name
                }
            }
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: true,
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Status",
            dataIndex: "active",
            sorter: true,
            sortDirections: ["ascend", "descend"],
            render: (active) => {
                return (
                    <AdminBadge size={ButtonSize.SMALL} type={active ? ButtonType.SUCCESS : ButtonType.SECONDARY}>
                        {active ? "Active" : "Disabled"}
                    </AdminBadge>
                );
            },
        },
        {
            title: "Created date",
            dataIndex: "createdAt",
            sorter: true,
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => {
                if (canDelete) {
                    return (
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteOne(record.id)}>
                            <AdminButton type={ButtonType.DANGER} size={ButtonSize.SMALL}>
                                <AdminIcon name="delete" width={14}/>
                            </AdminButton>
                        </Popconfirm>
                    )
                }
            },
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
        }
    };

    const createBtn = (
        <React.Fragment>
            {canDelete ? <AdminButton onClick={handleDeleteMany} style={{margin: '2px'}}
                                      type={ButtonType.DANGER}>Delete</AdminButton> : ''}
            {canCreate ? <AdminButton href="/admin/users/create">Create</AdminButton> : ''}
        </React.Fragment>
    );

    const header = (
        <PageHeader pretitle="admin" title="Users" button={createBtn} separator={true}>
            Người dùng
        </PageHeader>
    );

    return (
        <LayoutPage header={header} user={user}>
            <BlockSplitter height={25}/>

            <Divider orientation="left">Filter</Divider>
            <HorizontalList itemSize={ListItemSize.STRETCH}>
                <ListItem style={{marginRight: "1rem"}}>
                    <Input
                        ref={el => formSearchRef.current.name = el}
                        label="Name"
                        placeholder="Name"
                        maxLength="255"
                    />
                </ListItem>
                <ListItem style={{marginRight: "1rem"}}>
                    <Input
                        ref={el => formSearchRef.current.email = el}
                        label="Email"
                        placeholder="Email"
                        maxLength="255"
                    />
                </ListItem>
                <ListItem style={{marginRight: "1rem"}}>
                    <InputSelect
                        ref={el => formSearchRef.current.active = el}
                        label={<label style={{display: "inline-block"}}>Status</label>}
                        labelInValue
                        defaultValue={{value: "None"}}
                    >
                        <Select.Option>None</Select.Option>
                        <Select.Option value={true}>Active</Select.Option>
                        <Select.Option value={false}>Disabled</Select.Option>
                    </InputSelect>
                </ListItem>
            </HorizontalList>
            <AdminButton onClick={e => handleSearch(false)} style={{margin: '2px'}}
                         type={ButtonType.INFO}>Search</AdminButton>
            <AdminButton onClick={e => handleSearch(true)} style={{margin: '2px'}}
                         type={ButtonType.SECONDARY}>Reset</AdminButton>


            <BlockSplitter/>
            <BlockSplitter height={25}/>
            <Card>
                <Table
                    rowKey={item => item.id}
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={tableData}
                    scroll={{x: DefaultStyles.container.maxWidthMD}}
                    pagination={pagination}
                    onChange={fetchList}
                />
            </Card>
            <BlockSplitter/>
        </LayoutPage>
    );
};

export default AdminUsersPage;
