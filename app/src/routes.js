import UserForm from "views/users/UserForm.jsx";
import UsersList from "views/users/UsersList.jsx";
import UserProfile from "views/UserProfile"

const dashboardRoutes = [
  {
    path: "/user",
    name: "Usuários",
    icon: "pe-7s-user",
    component: UsersList,
    layout: "/admin",
  },
  {
    path: "/new/user",
    name: "Usuários",
    icon: "pe-7s-user",
    component: UserForm,
    layout: "/admin",
    disabled: true
  },
  {
    path: "/edit/user/:id",
    name: "Usuários",
    icon: "pe-7s-user",
    component: UserForm,
    layout: "/admin",
    disabled: true
  },
  {
    path: "/table",
    name: "Processos",
    icon: "pe-7s-note2",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Pareceres",
    icon: "pe-7s-note2",
    component: UserForm,
    layout: "/finalizador",
  }
];

export default dashboardRoutes;
