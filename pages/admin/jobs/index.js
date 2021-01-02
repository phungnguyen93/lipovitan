import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import PageHeader from "@/dashkit/PageHeader";
import LayoutPage from "components/admin/LayoutPage";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize, ButtonType } from "@/dashkit/Buttons";
import { Divider, Popconfirm, Select, Table, Typography } from "antd";
import BlockSplitter from "@/diginext/elements/BlockSplitter";
import { Input, InputSelect } from "@/diginext/form/Form";
import Card from "@/diginext/containers/Card";
import ApiCall from "modules/ApiCall";
import AdminBadge from "@/dashkit/Badges";
import AppLink from "@/diginext/link/AppLink";
import AdminIcon from "@/dashkit/Icon";
import { DefaultStyles } from "components/admin/layout/AdminGlobalStyle";
import { checkPermission, showError, showNotifications, showSuccess } from "@/helpers/helpers";
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";

export const getServerSideProps = TrackingUserSession;

const {Paragraph, Text} = Typography;

const AdminJobPage = ({user, children}) => {
    const router = useRouter();
    const formSearchRef = useRef({});
    const [myTimeout, setMyTimeout] = useState();
    const [tableData, setTableData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [sorter, setSorter] = useState({});
    const [filter, setFilter] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectionType, setSelectionType] = useState("checkbox");
    const [jobLocation, setJobLocation] = useState([]);
    const [jobDepartment, setJobDepartment] = useState([]);
    const [jobContract, setJobContract] = useState([]);

    //Permissions
    const canList = checkPermission(user, 'job_list');
    const canCreate = checkPermission(user, 'job_add');
    const canEdit = checkPermission(user, 'job_edit');
    const canDetail = checkPermission(user, 'job_detail');
    const canDelete = checkPermission(user, 'job_delete');

    const canJobDepartmentList = checkPermission(user, 'job_department_list');
    const canJobContractList = checkPermission(user, 'contract_list');
    const canJobLocationList = checkPermission(user, 'job_location_list');

    //Init load
    useEffect(function () {
        if (!canList) {
            showNotifications(['You have no permission.']);
            router.push('/admin');

        } else {
            fetchList();
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

    //Methods
    const fetchList = function (pagination = null, filters = null, sorter = null) {
        let limit = pagination == null ? 10 : pagination.pageSize;
        let page = pagination == null ? 1 : pagination.current;
        let orderBy = sorter == null ? 'id' : sorter.field;
        let order = sorter == null ? -1 : (sorter.order == 'ascend' ? 1 : -1);
        let filtera = typeof filters == 'string' ? filters : filter;
        ApiCall({
            router,
            path: `/api/v1/admin/jobs?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}&${filtera}`,
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

    const handleDeleteMany = function (id = null) {
        let query = '';
        if (id) {
            query = `ids[]=${id}`;
        } else {
            selectedRowKeys.forEach(function (id) {
                query += `ids[]=${id}&`
            });
            if (!query) {
                return;
            }
        }

        ApiCall({
            router,
            path: `/api/v1/admin/jobs?${query}`,
            method: "DELETE",
            token: user.token,
        }).then((res) => {
            if (res.status) {
                showSuccess(res);
                fetchList(pagination, filter, sorter);
                if (!id) {
                    setSelectedRowKeys([]);
                }
            } else {
                showError(res);
            }
        });
    };

    const handleSearch = function (isRest = false) {
        let currentFilter = '';
        let currentFormSearch = {
            name: formSearchRef.current.name.value,
            jobLocation: [formSearchRef.current.jobLocation.value.value],
            jobContract: [formSearchRef.current.jobContract.value.value],
            jobDepartment: [formSearchRef.current.jobDepartment.value.value],
            active: formSearchRef.current.active.value.value,
        };

        Object.keys(currentFormSearch).forEach(function (index) {
            currentFilter += `${index}=${currentFormSearch[index]}&`;
        });

        if (isRest) {
            currentFilter = '';
            formSearchRef.current.name.value = '';
            formSearchRef.current.jobLocation.value = '';
            formSearchRef.current.jobContract.value = '';
            formSearchRef.current.jobDepartment.value = '';
            formSearchRef.current.active.value = '';
        }

        clearTimeout(myTimeout);
        let loginTimeout = setTimeout(async function () {
            fetchList(pagination, currentFilter, sorter);
        }, 1000);
        setMyTimeout(loginTimeout);
    };

    const columns = [
        // {
        //     title: "Image",
        //     dataIndex: "image",
        //     render: (image) => {
        //         return (
        //             <Image
        //                 src={image}
        //                 width={50}
        //             />
        //         );
        //     },
        // },
        {
            title: "Name",
            dataIndex: "name",
            sorter: true,
            sortDirections: ["ascend", "descend"],
            render: (field, row, index) => {
                if (canDetail && canEdit) {
                    return <AppLink href={`/admin/jobs/edit/${row.id}`}>{field}</AppLink>;
                } else {
                    return field
                }
            }
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            sorter: true,
            sortDirections: ["ascend", "descend"],
            render: (field) => {
                return field
            }
        },
        {
            title: "Working Place",
            dataIndex: "jobLocation",
            sorter: false,
            sortDirections: ["ascend", "descend"],
            render: (field, row) => {
                return field.name
            }
        },
        {
            title: "Contract",
            dataIndex: "jobContract",
            sorter: false,
            sortDirections: ["ascend", "descend"],
            render: (field, row) => {
                return field.name
            }
        },
        {
            title: "Department",
            dataIndex: "jobDepartment",
            sorter: false,
            sortDirections: ["ascend", "descend"],
            render: (field, row) => {
                return field.name
            }
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
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteMany(record.id)}>
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
            {canDelete ? <AdminButton onClick={() => handleDeleteMany(null)} style={{margin: '2px'}}
                                      type={ButtonType.DANGER}>Delete</AdminButton> : ''}
            {canCreate ? <AdminButton href="/admin/jobs/create">Create</AdminButton> : ''}
        </React.Fragment>
    );

    const header = (
        <PageHeader pretitle="admin" title="Job" button={createBtn} separator={true}>
            Job
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
                    <InputSelect
                        ref={el => formSearchRef.current.jobLocation = el}
                        label={<label style={{display: "inline-block"}}>Working Place</label>}
                        labelInValue
                        defaultValue={{value: "", label: '--- Select ---'}}
                    >
                        <Select.Option value="">--- Select ---</Select.Option>
                        {
                            jobLocation.map(function (item) {
                                return (
                                    <Select.Option key={item.id}
                                                   value={item.id}>{item.name}</Select.Option>
                                )
                            })
                        }
                    </InputSelect>
                </ListItem>
                <ListItem style={{marginRight: "1rem"}}>
                    <InputSelect
                        ref={el => formSearchRef.current.jobContract = el}
                        label={<label style={{display: "inline-block"}}>Contract</label>}
                        labelInValue
                        defaultValue={{value: "", label: '--- Select ---'}}
                    >
                        <Select.Option value="">--- Select ---</Select.Option>
                        {
                            jobContract.map(function (item) {
                                return (
                                    <Select.Option key={item.id}
                                                   value={item.id}>{item.name}</Select.Option>
                                )
                            })
                        }
                    </InputSelect>
                </ListItem>
                <ListItem style={{marginRight: "1rem"}}>
                    <InputSelect
                        ref={el => formSearchRef.current.jobDepartment = el}
                        label={<label style={{display: "inline-block"}}>Department</label>}
                        labelInValue
                        defaultValue={{value: "", label: '--- Select ---'}}
                    >
                        <Select.Option value="">--- Select ---</Select.Option>
                        {
                            jobDepartment.map(function (item) {
                                return (
                                    <Select.Option key={item.id}
                                                   value={item.id}>{item.name}</Select.Option>
                                )
                            })
                        }
                    </InputSelect>
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

export default AdminJobPage;
