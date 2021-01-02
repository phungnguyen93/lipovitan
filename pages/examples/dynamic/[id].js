import MasterPage from "components/website/master/MasterPage";
import CONFIG from "web.config";
import BasicLayout from "components/diginext/layout/BasicLayout";

export async function getServerSideProps({ query, params }) {
  console.log(query, params);
  console.log(CONFIG.PUBLIC_APP_DOMAIN);

  return {
    props: {
      params,
      query,
    },
  };
}

export default function RequestApi({ params, query, req }) {
  return (
    <MasterPage>
      <BasicLayout padding="50px">
        <h1>Dynamic params: {JSON.stringify(params)}</h1>
      </BasicLayout>
    </MasterPage>
  );
}
