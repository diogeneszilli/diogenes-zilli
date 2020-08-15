import UserForm from "views/users/UserForm.jsx";
import UsersList from "views/users/UsersList.jsx";
import UserProfile from "views/UserProfile"

const roles = {
  ADMINISTRADOR: "ADMINISTRADOR",
  TRIADOR: "TRIADOR",
  FINALIZADOR: "FINALIZADOR"
}

const dashboardRoutes = [
  {
    path: "/user",
    name: "Usuários",
    icon: "pe-7s-user",
    component: UsersList,
    layout: "/home",
    auth: [roles.ADMINISTRADOR]
  },
  {
    path: "/new/user",
    name: "Usuários",
    icon: "pe-7s-user",
    component: UserForm,
    layout: "/home",
    auth: [roles.ADMINISTRADOR],
    disabled: true
  },
  {
    path: "/edit/user/:id",
    name: "Usuários",
    icon: "pe-7s-user",
    component: UserForm,
    layout: "/home",
    auth: [roles.ADMINISTRADOR],
    disabled: true
  },
  {
    path: "/table",
    name: "Processos",
    icon: "pe-7s-note2",
    component: UserProfile,
    auth: [roles.TRIADOR],
    layout: "/home"
  },
  {
    path: "/table",
    name: "Pareceres",
    icon: "pe-7s-note2",
    component: UserForm,
    auth: [roles.FINALIZADOR],
    layout: "/home"
  }
];

export default dashboardRoutes;
