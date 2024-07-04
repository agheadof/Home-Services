/* eslint-disable */

// import Products from "layouts/products";
import SignIn from "layouts/authentication/sign-in";
import Dashboard from "layouts/dashboard";
// @mui icons
import Icon from "@mui/material/Icon";
import Ads from "layouts/ads";
import { PushNotification } from "layouts/notification";
import Support from "layouts/support";
import Accounts from 'layouts/accounts'
import Requests from 'layouts/requests'



const routes = [
  {
    type: "collapse",
    name: "Home",
    ar_name: "الصفحة الرئيسية",
    key: "dashboard",
    icon: <Icon fontSize="small">Dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Advertisement",
    ar_name: "الإعلانات",
    key: "ads",
    icon: <Icon fontSize="small">Advertisement</Icon>,
    route: "/ads",
    component: <Ads />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Notification",
    ar_name: "الإشعارات",
    key: "notify",
    icon: <Icon fontSize="small">Notification</Icon>,
    route: "/notify",
    component: <PushNotification />,
    isPrivate: true,
  }
  ,
  {
    type: "collapse",
    name: "Requests",
    ar_name: "الطلبات",
    key: "requests",
    icon: <Icon fontSize="small">Requests</Icon>,
    route: "/requests",
    component: <Requests />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Support",
    ar_name: "الدعم",
    key: "support",
    icon: <Icon fontSize="small">Customer Support</Icon>,
    route: "/support",
    component: <Support />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    isPrivate: false,
  },
];

const user = JSON.parse(localStorage.getItem("currentUser"));
if (user && user.type === 'super') {
  routes.splice(4, 0, {
    type: "collapse",
    name: "Account Administration",
    ar_name: "إدارة الحسابات",
    key: "users",
    icon: <Icon fontSize="small">Account Administration</Icon>,
    route: "/users",
    component: <Accounts />,
    isPrivate: true,
  })
}

export default routes;
