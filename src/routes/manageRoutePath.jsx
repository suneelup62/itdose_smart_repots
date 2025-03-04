import React, {  lazy }  from "react";
import Layout from "@app/layouts";
import Authenticated from "@app/Guard/Authenticated.jsx";
import Guest from "@app/Guard/Guest.jsx";
// import LLL from  "../modules/login/Login"
function manageRoutePath() {

  const LLL = React.lazy(()=> import("../modules/login/Login"))
  const allRoutes = [
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/DirectPatientReg",
      component: lazy(
        () => import("@app/pages/frontOffice/PatientRegistration/Index.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/PatientBlackList",
      component: lazy(
        () =>
          import(
            "@app/pages/frontOffice/PatientRegistration/PatientBlackList.jsx"
          )
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/dashboard",
      component: lazy(() => import("@app/pages/Dashboard.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/opd-servicebooking",
      component: lazy(
        () => import("@app/pages/frontOffice/OPD/OPDServiceBooking.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/Confirmation",
      component: lazy(
        () => import("@app/pages/frontOffice/OPD/Confirmation.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/opd-setellment",
      component: lazy(
        () => import("@app/pages/frontOffice/OPDSetellment/Index.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/opd-refund",
      component: lazy(() => import("@app/pages/frontOffice/OPD/OPDRefund.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/opd-advance",
      component: lazy(
        () => import("@app/pages/frontOffice/OPDAdvance/Index.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/card-print",
      component: lazy(
        () => import("@app/pages/frontOffice/OPD/CardPrint.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/Uploadpatientdocuments",
      component: lazy(
        () => import("@app/pages/frontOffice/OPD/UploadViewDocument.jsx")
      ),
      exact: true,
    },

    {
      Guard: Authenticated,
      layout: Layout,
      path: "/ReceiptReprint",
      component: lazy(
        () => import("@app/pages/frontOffice/Re_Print/ReceiptReprint.jsx")
      ),
      exact: true,
    },

    {
      Guard: Guest,
      path: "/login",
      component: LLL,
      exact: true,
    },
    {
      path: "/ForgetPassword",
      component: lazy(() => import("@app/modules/login/ForgetPassword.jsx")),
      exact: true,
    },

    {
      Guard: Authenticated,
      layout: Layout,
      path: "/OpdTriageRoom",
      component: lazy(
        () => import("@app/pages/triageRoom/OPD/OpdTriageRoom.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/expense-voucher",
      component: lazy(
        () => import("@app/pages/frontOffice/tools/ExpenseVoucher.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/DebitCreditNote",
      component: lazy(
        () => import("@app/pages/frontOffice/tools/DebitCreditNote.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/IPDAdmissionNew",
      component: lazy(
        () => import("@app/pages/Billing/IPD/IPDAdmissionNew.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/PatientRegSearch",
      component: lazy(
        () => import("@app/pages/Billing/IPD/PatientRegSearch.jsx")
      ),
      exact: true,
    },
  ];
  return allRoutes;
}

export default manageRoutePath;
