import AdminMasterPage from "components/admin/layout/AdminMasterPage";

import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";

import {
  HorizontalList,
  // VerticalList,
  // GridList,
  ListItem,
  ListItemSize,
  ListType,
  // VerticalListAlign,
  // HorizontalListAlign,
} from "components/diginext/layout/ListLayout";

import Section from "components/diginext/containers/Section";
import ExpandContainer from "components/diginext/containers/ExpandContainer";
import SidebarComponentList from "components/dashkit/SidebarComponentList";
import SectionHeader from "components/dashkit/PageHeader";
import SectionBadges from "components/dashkit/sections/SectionBadges";
import SectionButtons from "components/dashkit/sections/SectionButtons";
import SectionForms from "components/dashkit/sections/SectionForms";
import SectionDropdowns from "components/dashkit/sections/SectionDropdowns";
import SectionButtonGroups from "components/dashkit/sections/SectionButtonGroups";
import SectionBreadcrumbs from "components/dashkit/sections/SectionBreadcrumbs";
import SectionButtonCards from "components/dashkit/sections/SectionCards";
import SectionTooltips from "components/dashkit/sections/SectionTooltips";
import SectionPaginations from "components/dashkit/sections/SectionPaginations";
import SectionPageHeaders from "components/dashkit/sections/SectionPageHeaders";
import SectionTables from "components/dashkit/sections/SectionTables";
import SectionNavs from "components/dashkit/sections/SectionNavs";
import SectionNotifications from "components/dashkit/sections/SectionNotifications";
import SectionModals from "components/dashkit/sections/SectionModals";

const ComponentList = () => {
  return (
    <AdminMasterPage>
      <HorizontalList type={ListType.START} style={{ position: "fixed", width: "100%", height: "100%" }}>
        {/* Sidebar */}
        <ListItem style={{ overflow: "scroll" }}>
          <SidebarComponentList />
        </ListItem>

        {/* Page Content */}
        <ListItem size={ListItemSize.STRETCH}>
          <ExpandContainer>
            <div style={{ maxWidth: DefaultStyles.container.maxWidthLG, margin: "auto" }}>
              <Section padding="0px 30px">
                <SectionHeader title="Component List" separator={false} spaceBottom={false}>
                  List of all available components.
                </SectionHeader>
              </Section>

              {/* ============== ALERTS ============== */}

              <Section id="alerts" padding="30px">
                <SectionHeader title="Alerts" separator={true}></SectionHeader>
              </Section>

              {/* ============== BADGES ============== */}

              <SectionBadges />

              {/* ============== Breadcrumb ============== */}

              <SectionBreadcrumbs />

              {/* ============== BUTTONS ============== */}

              <SectionButtons />

              {/* ============== BUTTON GROUP ============== */}

              <SectionButtonGroups />

              {/* ============== CARDS ============== */}

              <SectionButtonCards />

              {/* ============== DROPDOWNS ============== */}

              <SectionDropdowns />

              {/* ============== FORMS ============== */}

              <SectionForms />

              {/* ============== NAVS ============== */}

              <SectionNavs />

              {/* ============== NOTIFICATIONS ============== */}

              <SectionNotifications />

              {/* ============== MODALS ============== */}

              <SectionModals />

              {/* ============== PAGE HEADERS ============== */}

              <SectionPageHeaders />

              {/* ============== PAGINATION ============== */}

              <SectionPaginations />

              {/* ============== TABLES ============== */}

              <SectionTables />

              {/* ============== TOOLTIPS ============== */}

              <SectionTooltips />

              {/* ============== END ============== */}
            </div>
          </ExpandContainer>
        </ListItem>
      </HorizontalList>
    </AdminMasterPage>
  );
};

export default ComponentList;
