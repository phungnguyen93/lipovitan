import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import PageHeader from "@/dashkit/PageHeader";
import LayoutPage from "components/admin/LayoutPage";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize, ButtonType } from "@/dashkit/Buttons";
import { Divider, Popconfirm, Select, Table } from "antd";
import BlockSplitter from "@/diginext/elements/BlockSplitter";
import { Input, InputSelect } from "@/diginext/form/Form";
import Card from "@/diginext/containers/Card";
import ApiCall from "modules/ApiCall";
import AdminBadge from "@/dashkit/Badges";
import AppLink from "@/diginext/link/AppLink";
import AdminIcon from "@/dashkit/Icon";
import { DefaultStyles } from "components/admin/layout/AdminGlobalStyle";
import { checkPermission, showError, showNotifications, showSuccess } from "@/helpers/helpers";
import { getObjectTrans } from "@/helpers/translation";
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";
import { FileFilled } from "@ant-design/icons";
import { ApplicantStatusTrans } from "@/constants/job.enum";

export const getServerSideProps = TrackingUserSession;

const AdminJobApplicantPage = ({user, children}) => {
    const router = useRouter();
    const formSearchRef = useRef({});
    const [myTimeout, setMyTimeout] = useState();
    const [tableData, setTableData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [sorter, setSorter] = useState({});
    const [filter, setFilter] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectionType, setSelectionType] = useState("checkbox");
    const [jobs, setJobs] = useState([]);

    //Permissions
    const canList = checkPermission(user, 'job_applicant_list');
    const canCreate = checkPermission(user, 'job_applicant_add');
    const canEdit = checkPermission(user, 'job_applicant_edit');
    const canDetail = checkPermission(user, 'job_applicant_detail');
    const canDelete = checkPermission(user, 'job_applicant_delete');
    const canJobList   = checkPermission(user, 'job_list');

    //Init load
    useEffect(function () {
        if (!canList) {
            showNotifications(['You have no permission.']);
            router.push('/admin');

        } else {
            fetchList();
            if(canJobList) {
                fetchJobs();
            }
        }
    }, []);

    const fetchJobs = function() {
        ApiCall({
            router,
            path: `/api/v1/admin/jobs?get=true`,
            token: user.token,
        }).then((res) => {
            if (res.status && res.data) {
                console.log(res.data);
                setJobs(res.data);
            } else {
                setJobs([]);
                showError(res);
            }
        });
    };

    //Methods
    const fetchList = function (pagination = null, filters = null, sorter = null) {
        let limit = pagination == null ? 10 : pagination.pageSize;
        let page = pagination == null ? 1 : pagination.current;
        let orderBy = sorter == null ? 'id' : sorter.field;
        let order = sorter == null ? -1 : (sorter.order == 'ascend' ? 1 : -1);
        let filtera = typeof filters == 'string' ? filters : filter;
        ApiCall({
            router,
            path: `/api/v1/admin/job-applicants?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}&${filtera}`,
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
            path: `/api/v1/admin/job-applicants?${query}`,
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
            q: formSearchRef.current.q.value,
            job: formSearchRef.current.job.value.value || '',
            status: formSearchRef.current.status.value.value || '',
        };

        Object.keys(currentFormSearch).forEach(function (index) {
            currentFilter += `${index}=${currentFormSearch[index]}&`;
        });

        if (isRest) {
            currentFilter = '';
            formSearchRef.current.q.value = '';
            formSearchRef.current.job.value = '';
            formSearchRef.current.status.value = '';
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
            title: "Career",
            dataIndex: "job",
            sorter: true,
            sortDirections: ["ascend", "descend"],
            render: (field, row) => {
                return field.name;
            }
        },
        {
            title: "Name",
            dataIndex: "name",
            sorter: true,
            sortDirections: ["ascend", "descend"],
            render: (field, row, index) => {
                if (canDetail && canEdit) {
                    return <AppLink href={`/admin/job-applicants/edit/${row.id}`}>{field}</AppLink>;
                } else {
                    return field
                }
            }
        },
        {
            title: "Phone",
            dataIndex: "phone",
            sorter: true,
            sortDirections: ["ascend", "descend"],
            render: (field, row, index) => {
                return field
            }
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: true,
            sortDirections: ["ascend", "descend"],
            render: (field, row, index) => {
                return field
            }
        },
        {
            title: "Address",
            dataIndex: "address",
            sorter: true,
            sortDirections: ["ascend", "descend"],
            render: (field, row, index) => {
                return field
            }
        },
        {
            title: "CV",
            dataIndex: "fileCv",
            sorter: false,
            sortDirections: ["ascend", "descend"],
            render: (field) => {
                return field ? <AppLink href={field}>CV <FileFilled /></AppLink> : '';
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            sorter: true,
            sortDirections: ["ascend", "descend"],
            render: (field) => {
                return ApplicantStatusTrans(field);
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
            {canCreate ? <AdminButton href="/admin/job-applicants/create">Create</AdminButton> : ''}
        </React.Fragment>
    );

    const header = (
        <PageHeader pretitle="admin" title="Job Apply" button={createBtn} separator={true}>
            Job Apply
        </PageHeader>
    );

    return (
        <LayoutPage header={header} user={user}>
            <BlockSplitter height={25}/>

            <Divider orientation="left">Filter</Divider>
            <HorizontalList itemSize={ListItemSize.STRETCH}>
                <ListItem style={{marginRight: "1rem"}}>
                    <Input
                        ref={el => formSearchRef.current.q = el}
                        label="Search"
                        placeholder="Type something"
                        maxLength="255"
                    />
                </ListItem>
                <ListItem style={{ marginRight: "1rem" }}>
                    <InputSelect
                        ref={el => formSearchRef.current.job = el}
                        label={<label style={{ display: "inline-block" }}>Career</label>}
                        labelInValue
                        defaultValue={{ value: ""}}
                    >
                        <Select.Option value="">--- Select ---</Select.Option>
                        {
                            jobs.map(function(item) {
                                return (
                                    <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                )
                            })
                        }
                    </InputSelect>
                </ListItem>
                <ListItem style={{marginRight: "1rem"}}>
                    <InputSelect
                        ref={el => formSearchRef.current.status = el}
                        label={<label style={{display: "inline-block"}}>Status</label>}
                        labelInValue
                        defaultValue={{value: ""}}
                    >
                        <Select.Option value={""}>--- Select ---</Select.Option>
                        <Select.Option key={1} value={1}>{'New'}</Select.Option>
                        <Select.Option key={2} value={2}>{'REVIEWED'}</Select.Option>
                        <Select.Option key={3} value={3}>{'APPOINTMENTED'}</Select.Option>
                        <Select.Option key={4} value={4}>{'FAILED'}</Select.Option>
                        <Select.Option key={5} value={5}>{'PASSED'}</Select.Option>
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

export default AdminJobApplicantPage;
