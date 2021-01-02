import LayoutPage from "components/admin/LayoutPage";
import PageHeader from "components/dashkit/PageHeader";
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";

export const getServerSideProps = TrackingUserSession;

const AdminIndex = ({ user }) => {

    const header = (
        <PageHeader pretitle="admin" title="Dashboard" separator={true}>
            Thông số tổng quát.
        </PageHeader>
    );

    return <LayoutPage header={header} user={user}></LayoutPage>;
};

export default AdminIndex;
