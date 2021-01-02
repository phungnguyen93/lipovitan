export const routes = [
    {
        path: "/admin/jobs",
        key: "admin-jobs",
        name: "Career",
        meta: {icon: "dashboard", title: "Product"},
        permissions: [],
        hidden: false,
        children: [
            {
                path: "/admin/jobs",
                key: "admin-jobs",
                name: "Jobs",
                permissions: [],
                hidden: false,
                meta: {title: "Job"},
            },
            {
                path: "/admin/job-contracts",
                key: "admin-job-contracts",
                name: "Contracts",
                permissions: [],
                hidden: false,
                meta: {title: "Job Contracts"},
            },
            {
                path: "/admin/job-departments",
                key: "admin-job-departments",
                name: "Departments",
                permissions: [],
                hidden: false,
                meta: {title: "Job Department"},
            },
            {
                path: "/admin/job-locations",
                key: "admin-job-locations",
                name: "Working Place",
                permissions: [],
                hidden: false,
                meta: {title: "Job Location"},
            },
            {
                path: "/admin/job-applicants",
                key: "admin-job-applicants",
                name: "Job Apply",
                permissions: [],
                hidden: false,
                meta: {title: "Job Apply"},
            }
        ]
    },
    {
        path: "/admin/posts",
        key: "admin-posts",
        name: "Post",
        meta: {icon: "file", title: "Post"},
        permissions: ['post_list', 'post_category_list'],
        hidden: false,
        children: [
            {
                path: "/admin/posts",
                key: "/admin/posts",
                name: "Post",
                permissions: ['post_list'],
                hidden: false,
                meta: {icon: "", title: "Post"},
            },
            {
                path: "/admin/post-categories",
                key: "/admin/post-categories",
                name: "Category",
                permissions: ['post_category_list'],
                hidden: false,
                meta: {icon: "", title: "Category"},
            }
        ]
    },
    {
        path: "/admin/contacts",
        key: "admin-contact",
        name: "Contact",
        meta: {icon: "file", title: "Contact"},
        permissions: ['contact_list'],
        hidden: false,
    },
    {
        path: "/admin/offices",
        key: "admin-office",
        name: "Office",
        meta: {icon: "home", title: "Office"},
        permissions: ['office_list'],
        hidden: false,
    },
    {
        path: "/admin/mt-stores",
        key: "admin-mt-stores",
        name: "Modern Channels",
        meta: {icon: "shopping-cart", title: "Modern Channels"},
        permissions: ['mt_store_list'],
        hidden: false,
    },
    {
        path: "/admin/gt-stores",
        key: "admin-gt-stores",
        name: "GT Channels",
        meta: {icon: "shopping-cart", title: "GT Channels"},
        permissions: ['gt_store_list'],
        hidden: false,
    },
    {
        path: "/admin/users",
        key: "admin-users",
        name: "Admin",
        meta: {icon: "admin", title: "Admin"},
        permissions: ['user_list', 'role_list'],
        hidden: false,
        children: [
            {
                path: "/admin/users",
                key: "/admin/users",
                name: "Users",
                permissions: ['user_list'],
                hidden: false,
                meta: {icon: "", title: "Users"},
            },
            {
                path: "/admin/roles",
                key: "/admin/roles",
                name: "Roles",
                permissions: ['role_list'],
                hidden: false,
                meta: {icon: "", title: "Roles"},
            },
            {
                path: "/admin/setting",
                key: "/admin/setting",
                name: "Setting",
                permissions: ['setting_list', 'setting_edit'],
                hidden: false,
                meta: {icon: "", title: "Setting"},
            }
        ]
    },
];