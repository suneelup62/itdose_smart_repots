// import { createSlice } from "@reduxjs/toolkit";
// import { CentreWiseCacheByCenterID } from "./CommonExportFunction";
// import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
// const localData = useLocalStorage("userDetails", "get");
// console.log("localData flag", localData?.flag);
// const childrens = [
//   {
//     childrenName: "Centre Master",
//     childrenOrder: "1",
//     breadcrumb: "Smart Report/Centre Master",
//     url: "/report-centre",
//     flag: Number(localData.flag),
//   },
//   {
//     childrenName: "Investigation",
//     childrenOrder: "2",
//     breadcrumb: "Smart Report/Investigation Master",
//     url: "/investigation",
//     flag: 0,
//   },
//   {
//     childrenName: "Description",
//     childrenOrder: "3",
//     breadcrumb: "Smart Report/Description",
//     url: "/description",
//     flag: 0,
//   },
//   {
//     childrenName: "Riskfactor",
//     childrenOrder: "4",
//     breadcrumb: "Smart Report/Riskfactor",
//     url: "/riskfactor",
//     flag: 0,
//   },
//   {
//     childrenName: "QRcode",
//     childrenOrder: "5",
//     breadcrumb: "Smart Report/QRcode",
//     url: "/QRcode",
//     flag: 0,
//   },
//   {
//     childrenName: "Doctor signature",
//     childrenOrder: "6",
//     breadcrumb: "Smart Report/Doctor signature",
//     url: "/doctor_signature",
//     flag: 0,
//   },
//   {
//     childrenName: "Report header",
//     childrenOrder: "7",
//     breadcrumb: "Smart Report/Report header",
//     url: "/reportHeader",
//     flag: 0,
//   },
//   // {
//   //   childrenName: "Observation",
//   //   childrenOrder: "2",
//   //   breadcrumb: "Smart Report/Observation Master",
//   //   url: "/observation",
//   // },
// ];
// const returnFlagZeroArray = () => {
//   console.log(childrens);
//   const returnedArray = childrens?.filter((ele) => ele?.flag === 0);
//   console.log(returnedArray);
//   return returnedArray;
// };
// const initialStates = {
//   CentreWiseCache: [],
//   GetMenuList: [
//     // Smart Report
//     {
//       menuName: "Smart Report",
//       menuOrder: "1",
//       menuID: "86",
//       menuIcon: "fas fa-tachometer-alt",
//       children: returnFlagZeroArray(),
//     },
//     // {
//     //   menuName: "Rate Master",
//     //   menuOrder: "2",
//     //   menuID: "84",
//     //   menuIcon: "fas fa-tachometer-alt",
//     //   children: [
//     //     {
//     //       childrenName: "Rate List",
//     //       childrenOrder: "1",
//     //       breadcrumb: "Rate Master / Rate List",
//     //       url: "/ratelist",
//     //     },
//     //     {
//     //       childrenName: "Test Master",
//     //       childrenOrder: "2",
//     //       breadcrumb: "Test Master / Test List",
//     //       url: "/testList",
//     //     },
//     //   ],
//     // },
//     // {
//     //   menuName: "Reprint",
//     //   menuOrder: "3",
//     //   menuID: "85",
//     //   menuIcon: "fas fa-tachometer-alt",
//     //   children: [
//     //     {
//     //       childrenName: "ReceiptReprint",
//     //       childrenOrder: "1",
//     //       breadcrumb: "Reprint/ Receipt Reprint",
//     //       url: "/ReceiptReprint",
//     //     },
//     //   ],
//     // },
//   ],

//   loading: false,
//   error: "",
//   message: "",
//   success: false,
// };
// const initialState ={
//   data:{}
// }


// export const CommonSlice = createSlice({
//   name: "CommonSlice",
//   initialState,
//   reducers: {
//     reset: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(CentreWiseCacheByCenterID.pending, (state) => {
//         state.loading = true;
//         state.error = "";
//         state.success = false;
//       })
//       .addCase(CentreWiseCacheByCenterID.fulfilled, (state, { payload }) => {
//         state.CentreWiseCache = payload?.data;
//         state.loading = false;
//         state.success = true;
//         state.error = "";
//         state.message = payload?.message;
//       })
//       .addCase(CentreWiseCacheByCenterID.rejected, (state, { error }) => {
//         state.loading = false;
//         state.error = error.message;
//         state.success = false;
//         state.message = error.message;
//         //notify(error.message, "error");
//       });
//   },
// });
// export const { reset } = CommonSlice.actions;
// export default CommonSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";
// import { CentreWiseCacheByCenterID } from "./CommonExportFunction";
// import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";

// const localData = useLocalStorage("userDetails", "get");
// // console.log("localData flag", localData?.flag);

// // Static child menu items with dynamic flag from localStorage
// const childrens = [
//   {
//     childrenName: "Centre Master",
//     childrenOrder: "1",
//     breadcrumb: "Smart Report/Centre Master",
//     url: "/report-centre",
//     flag: Number(localData?.flag),
//   },
//   {
//     childrenName: "Investigation",
//     childrenOrder: "2",
//     breadcrumb: "Smart Report/Investigation Master",
//     url: "/investigation",
//     flag: 0,
//   },
//   {
//     childrenName: "Description",
//     childrenOrder: "3",
//     breadcrumb: "Smart Report/Description",
//     url: "/description",
//     flag: 0,
//   },
//   {
//     childrenName: "Riskfactor",
//     childrenOrder: "4",
//     breadcrumb: "Smart Report/Riskfactor",
//     url: "/riskfactor",
//     flag: 0,
//   },
//   {
//     childrenName: "QRcode",
//     childrenOrder: "5",
//     breadcrumb: "Smart Report/QRcode",
//     url: "/QRcode",
//     flag: 0,
//   },
//   {
//     childrenName: "Doctor signature",
//     childrenOrder: "6",
//     breadcrumb: "Smart Report/Doctor signature",
//     url: "/doctor_signature",
//     flag: 0,
//   },
//   {
//     childrenName: "Report header",
//     childrenOrder: "7",
//     breadcrumb: "Smart Report/Report header",
//     url: "/reportHeader",
//     flag: 0,
//   },
// ];

// // Filters only children with flag === 0
// const returnFlagZeroArray = () => {
//   const returnedArray = childrens?.filter((ele) => ele?.flag === 1);
//   console.log(returnedArray)
//   return returnedArray;
// };

// // Initial state with full structure
// const initialState = {
//   CentreWiseCache: [],
//   GetMenuList: [
//     {
//       menuName: "Smart Report",
//       menuOrder: "1",
//       menuID: "86",
//       menuIcon: "fas fa-tachometer-alt",
//       children: [...childrens],
//     },
//   ],
//   loading: false,
//   error: "",
//   message: "",
//   success: false,
// };

// const menuToHide = ['/report-centre']

// export const CommonSlice = createSlice({
//   name: "CommonSlice",
//   initialState,
//   reducers: {
//     // Resets state on logout
//     reset: () => initialState,
//     setMenuBasedOnRole: (state, action) => {
//       const { roleFlag } = action?.payload;
//       console.log('roleFlagroleFlagroleFlag',roleFlag)
    
//       let updatedChildrenList = returnFlagZeroArray();
    
//       if (roleFlag === 1) {
//         updatedChildrenList = updatedChildrenList.filter(
//           (menu) => !menuToHide.includes(menu?.url)
//         );
//       }
    
//       if (state.GetMenuList && state.GetMenuList.length > 0) {
//         state.GetMenuList[0].children = updatedChildrenList;
//       }
//     }
    
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(CentreWiseCacheByCenterID.pending, (state) => {
//         state.loading = true;
//         state.error = "";
//         state.success = false;
//       })
//       .addCase(CentreWiseCacheByCenterID.fulfilled, (state, { payload }) => {
//         state.CentreWiseCache = payload?.data;
//         state.loading = false;
//         state.success = true;
//         state.error = "";
//         state.message = payload?.message;
//       })
//       .addCase(CentreWiseCacheByCenterID.rejected, (state, { error }) => {
//         state.loading = false;
//         state.error = error.message;
//         state.success = false;
//         state.message = error.message;
//       });
//   },
// });

// export const { reset, setMenuBasedOnRole } = CommonSlice.actions;
// export default CommonSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { CentreWiseCacheByCenterID } from "./CommonExportFunction";

const allChildrenMenus = [
  {
    childrenName: "Centre Master",
    childrenOrder: "1",
    breadcrumb: "Smart Report/Centre Master",
    url: "/report-centre",
  },
  {
    childrenName: "Investigation",
    childrenOrder: "2",
    breadcrumb: "Smart Report/Investigation Master",
    url: "/investigation",
  },
  {
    childrenName: "Description",
    childrenOrder: "3",
    breadcrumb: "Smart Report/Description",
    url: "/description",
  },
  {
    childrenName: "Riskfactor",
    childrenOrder: "4",
    breadcrumb: "Smart Report/Riskfactor",
    url: "/riskfactor",
  },
  {
    childrenName: "QRcode",
    childrenOrder: "5",
    breadcrumb: "Smart Report/QRcode",
    url: "/QRcode",
  },
  {
    childrenName: "Doctor signature",
    childrenOrder: "6",
    breadcrumb: "Smart Report/Doctor signature",
    url: "/doctor_signature",
  },
  {
    childrenName: "Report header",
    childrenOrder: "7",
    breadcrumb: "Smart Report/Report header",
    url: "/reportHeader",
  },
];

const initialState = {
  CentreWiseCache: [],
  GetMenuList: [
    {
      menuName: "Smart Report",
      menuOrder: "1",
      menuID: "86",
      menuIcon: "fas fa-tachometer-alt",
      children: [...allChildrenMenus],
    },
  ],
  loading: false,
  error: "",
  message: "",
  success: false,
};

export const CommonSlice = createSlice({
  name: "CommonSlice",
  initialState,
  reducers: {
    reset: () => initialState,
    setMenuBasedOnRole: (state, action) => {
      const { roleFlag } = action.payload;

      let filteredMenus = [...allChildrenMenus];

      if (roleFlag === 1) {
        filteredMenus = filteredMenus.filter(
          (menu) => menu.url !== "/report-centre"
        );
      }

      state.GetMenuList[0].children = filteredMenus;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CentreWiseCacheByCenterID.pending, (state) => {
        state.loading = true;
      })
      .addCase(CentreWiseCacheByCenterID.fulfilled, (state, { payload }) => {
        state.CentreWiseCache = payload?.data;
        state.loading = false;
        state.success = true;
        state.message = payload?.message;
      })
      .addCase(CentreWiseCacheByCenterID.rejected, (state, { error }) => {
        state.loading = false;
        state.success = false;
        state.error = error.message;
        state.message = error.message;
      });
  },
});

export const { reset, setMenuBasedOnRole } = CommonSlice.actions;
export default CommonSlice.reducer;
