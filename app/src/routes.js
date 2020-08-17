import UserForm from "views/users/UserForm.jsx";
import UserList from "views/users/UserList.jsx";
import ProcessoForm from "views/processos/ProcessoForm.jsx";
import ProcessoList from "views/processos/ProcessoList.jsx";
import ProcessoView from "views/processos/ProcessoView.jsx";
import ParecerForm from "views/pareceres/ParecerForm.jsx";
import ParecerList from "views/pareceres/ParecerList.jsx";

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
    component: UserList,
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
    path: "/processo",
    name: "Processos",
    icon: "pe-7s-note2",
    component: ProcessoList,
    auth: [roles.TRIADOR],
    layout: "/home"
  },
  {
    path: "/view/processo/:id",
    name: "Processos",
    icon: "pe-7s-note2",
    component: ProcessoView,
    layout: "/home",
    auth: [roles.TRIADOR],
    disabled: true
  },
  {
    path: "/new/processo",
    name: "Processos",
    icon: "pe-7s-note2",
    component: ProcessoForm,
    layout: "/home",
    auth: [roles.TRIADOR],
    disabled: true
  },
  {
    path: "/edit/processo/:id",
    name: "Processos",
    icon: "pe-7s-note2",
    component: ProcessoForm,
    layout: "/home",
    auth: [roles.TRIADOR],
    disabled: true
  },
  {
    path: "/parecer",
    name: "Pareceres",
    icon: "pe-7s-note2",
    component: ParecerList,
    auth: [roles.FINALIZADOR],
    layout: "/home"
  },
  {
    path: "/new/parecer",
    name: "Pareceres",
    icon: "pe-7s-note2",
    component: ParecerForm,
    layout: "/home",
    auth: [roles.FINALIZADOR],
    disabled: true
  },
  {
    path: "/edit/parecer/:id",
    name: "Pareceres",
    icon: "pe-7s-note2",
    component: ParecerForm,
    layout: "/home",
    auth: [roles.FINALIZADOR],
    disabled: true
  }
];

export default dashboardRoutes;
