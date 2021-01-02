import MasterPage from "components/website/master/MasterPage";
import CONFIG from "web.config";
import BasicLayout from "components/diginext/layout/BasicLayout";
import AppLink from "components/diginext/link/AppLink";
import Header from "components/website/elements/Header";

export default function DemoHome(props) {
  // console.log(props);
  // console.log(CONFIG);

  return (
    <MasterPage>
      <BasicLayout padding="50px">
        <style jsx>{`
          ul {
            display: block;
            padding: 20px 0;
          }
          li {
            list-style-type: disc;
            display: list-item;
            line-height: 1.5;
            list-style: disc;
            font-size: 18px;
            margin-left: 20px;
          }
        `}</style>
        <Header>Examples</Header>
        <hr />
        <div>
          <ul>
            <li>
              <AppLink href="/examples/list-layout">List layout (Horizontal, Vertical, Grid)</AppLink>
            </li>
            <li>
              <AppLink href="/examples/request-api">How to fetch API for data</AppLink>
            </li>
            <li>
              <AppLink href="/examples/dynamic/12345">Parsing dynamic URL params</AppLink>
            </li>
            <li>
              <AppLink href="/examples/responsive">Responsive example (ListView)</AppLink>
            </li>
          </ul>
        </div>
      </BasicLayout>
    </MasterPage>
  );
}
