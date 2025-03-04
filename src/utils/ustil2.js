import { toast } from "react-toastify";
import { number, ROUNDOFF_VALUE } from "./constant";
import moment from "moment";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { updateFileClosed } from "../networkServices/DoctorApi";
import { pharmecyAddItem } from "../networkServices/pharmecy";
import { handleCalculatePatientIssue, payloadSettlerForPaymentGateWay } from "./utils";
const isMobile = window.innerWidth <= 768;
const ip = useLocalStorage("ip", "get");
const userData = useLocalStorage("userData", "get");
const pageURL = window.location.pathname

export const notify = (message, type = "success") => {
    if (type === "success") {
        toast.success(message);
    } else if (type === "warn") {
        toast.warn(message);
    } else if (type === "error") {
        toast.error(message);
    }
};

export const CashPanel =
{
    "PanelName": "CASH",
    "PanelID": 1,
    "isDefaultPanel": 1,
    "PanelGroup": "CASH",
    "PanelGroupID": 1,
    "ParentPanelID": 0,
    "ParentPanel": "",
    "PanelCroporateID": 0,
    "CorporareName": "",
    "PolicyNo": "",
    "PolicyCardNo": "",
    "PanelCardName": "",
    "PolicyExpiry": "",
    "PolciyCardHolderRelation": "",
    "ApprovalAmount": "",
    "ApprovalRemarks": "",
    "panelCurrencyFactor": 1,
    "panelCurrencyCountryID": 14,
    "ReferenceCode": "1",
    "ReferenceCodeOPD": "1",
    "label": "CASH",
    "value": 1
}

const handleSumPaidAmt = (paymentMethod) => {
    let amount = 0
    paymentMethod.map((val) => {
        if (val?.PaymentModeID === 8) {
            amount += val?.Amount
        }
    })
    return amount
}

const CalculateTaxAmt = (qty, mrp, taxPer, disPer) => {
    let discAmt = mrp * disPer * 0.01
    let taxableAmt = ((mrp - discAmt) * 100 * qty) / (100 + taxPer)
    return (taxableAmt * taxPer) * 0.01.toFixed(4)
}


export const SavePharmecyAPIPayload = (pDetails, hashcode, itemList, values, BindResource, paymentDetails, paymentMethod) => {
    // console.log("pDetails", pDetails)
    // console.log("itemList", itemList)
    // console.log("values", values)
    // console.log("BindResource", BindResource)
    // console.log("paymentDetails", paymentDetails)
    // console.log("paymentMethod", paymentMethod)
    // console.log("paymentMethod", paymentMethod)

    let isCommonDis = itemList?.reduce((ac, current) => ac + Number(current?.DisPer ? current?.DisPer : "0"), 0)
    if (isCommonDis === 0 || Number(paymentDetails?.discountPercentage) > 0) {
        let updatedList = itemList?.map((val) => {
            val.DisPer = paymentDetails?.discountPercentage
            let calculatedData = handleCalculatePatientIssue(val, "DisPer")
            return calculatedData;
        })
        itemList = [...updatedList]
    }


    const { type, Panel, Doctor } = values

    let pmh = {
        "patientID": String(type?.value == 2 ? "CASH002" : pDetails?.PatientID ? pDetails?.PatientID : ""),
        "doctorID": String(type?.value == 2 ? BindResource?.DoctorID_Self : pDetails?.DoctorID ? pDetails?.DoctorID : "0"),
        "patient_type": "",
        "panelID": Number(Panel?.PanelID ? Panel?.PanelID : 1),
        // "parentID": Number(type?.value == 2 ? 1 : Panel?.ParentPanelID === 0 ? Panel?.PanelID : Panel?.ParentPanelID),
        "referedBy": String(type?.value == 2 ? Doctor?.value : 0),
        "hashCode": String(hashcode ? hashcode : ""),
        "panelPaybleAmt": Number(paymentDetails?.panelPayable ? paymentDetails?.panelPayable : 0),
        "patientPaybleAmt": Number(paymentDetails?.minimumPayableAmount ? paymentDetails?.minimumPayableAmount : 0),
        "panelPaidAmt": handleSumPaidAmt(paymentMethod),
        "patientPaidAmt": Number(paymentDetails?.paidAmount ? paymentDetails?.paidAmount : 0) - handleSumPaidAmt(paymentMethod),
        "cardNo": String(Panel?.PolicyCardNo ? Panel?.PolicyCardNo : ""),
    }
    let lt = {
        "ipNo": String(pDetails?.TransactionID ? pDetails?.TransactionID : ""),
        "netAmount": Number(paymentDetails?.netAmount ? paymentDetails?.netAmount : 0),
        "grossAmount": Number(paymentDetails?.billAmount ? paymentDetails?.billAmount : 0),
        "discountOnTotal": Number(paymentDetails?.discountAmount ? paymentDetails?.discountAmount : 0),
        "discountReason": Number(paymentDetails?.discountAmount) > 0 ? String(paymentDetails?.discountReason ? paymentDetails?.discountReason : "") : "",
        "discountApproveBy": Number(paymentDetails?.discountAmount) > 0 ? String(paymentDetails?.discountApproveBy ? paymentDetails?.discountApproveBy : "") : "",
        "adjustment": Number(paymentDetails?.paidAmount ? paymentDetails?.paidAmount : 0),
        "roundOff": String(paymentDetails?.roundOff ? paymentDetails?.roundOff : "0"),
        "remarks": "test",
        "currentAge": String(type?.value == 2 ? `${values?.Age} ${values?.AgeType?.value}` : pDetails?.AgeGender.split("/")[0])
    }

    let ltd = []
    let salesDetails = []
    let patientMedicineData = []
    let draftMedicineData = []
    let clinicalTrial = []
    let paymentDetail = payloadSettlerForPaymentGateWay(paymentMethod)

    itemList?.map((val) => {
        // ltd
        let ltdObj = {
            "itemName": `${val?.ItemName} (Batch : ${val?.BatchNumber})`,
            "type_ID": String(val?.Type_ID ? val?.Type_ID : "0"),
            "doctorID": String(type?.value == 2 ? BindResource?.DoctorID_Self : pDetails?.DoctorID ? pDetails?.DoctorID : "0"),
            "subCategoryID": String(val?.SubCategoryID ? val?.SubCategoryID : "0"),
            "amount": Number(val?.Amount)?.toFixed(6),
            "rate": Number(val?.MRP)?.toFixed(6),
            "quantity": Number(val?.Quantity ? val?.Quantity : "0")?.toFixed(6),
            "discAmt": Number(val?.discountAmount ? val?.discountAmount : "0")?.toFixed(6),
            "discountPercentage": Number(val?.DisPer ? val?.DisPer : "0")?.toFixed(6),
            "itemID": String(val?.ItemID),

            "discountReason": Number(val?.DisPer ? val?.DisPer : "0") > 0 ? String(paymentDetails?.discountReason ? paymentDetails?.discountReason : "") : "",

            "coPayPercent": val?.discountCoPay?.IsPayble === '0' ? pDetails?.PatientType === "IPD" ? Number(val?.discountCoPay?.IPDCoPayPercent) : Number(val?.discountCoPay?.OPDCoPayPercent) : 0,

            "isPayable": Number(Panel?.PanelID ? Panel?.PanelID : 1) === 1 ? 0 : Number(val?.discountCoPay?.IsPayble ? val?.discountCoPay?.IsPayble : 0),

            "isPanelWiseDisc": (Number(Panel?.PanelID ? Panel?.PanelID : 1) === 1 ? 0 : pDetails?.PatientType === "IPD" ? Number(val?.discountCoPay?.IPDPanelDiscPercent) : Number(val?.discountCoPay?.OPDPanelDiscPercent)) > 0 ? 1 : 0,

            "stockID": String(val?.stockid ? val?.stockid : "0"),
            "netItemAmt": Number(val?.Amount).toFixed(6),
            "toBeBilled": Number(val?.ToBeBilled ? val?.ToBeBilled : 0),
            "isReusable": String(val?.IsUsable ? val?.IsUsable : ""),
            "medExpiryDate": String(val?.MedExpiryDate),
            "batchNumber": String(val?.BatchNumber ? val?.BatchNumber : ""),
            "purTaxPer": Number(val?.PurTaxPer ? val?.PurTaxPer : "0"),
            "purTaxAmt": CalculateTaxAmt(Number(val?.Quantity), val?.UnitPrice, val?.PurTaxPer, Number(val?.DisPer)),
            "unitPrice": Number(val?.UnitPrice ? val?.UnitPrice : "0"),
            "igstPercent": Number(val?.IGSTPercent ? val?.IGSTPercent : "0"),
            "cgstPercent": Number(val?.CGSTPercent ? val?.CGSTPercent : "0"),
            "sgstPercent": Number(val?.SGSTPercent ? val?.SGSTPercent : "0"),
            "hsnCode": String(val?.HSNCode ? val?.HSNCode : ""),
            "isDischargeMedicine": Number(values?.DisMed?.value ? values?.DisMed?.value : 0),
        }
        ltd.push(ltdObj)

        // salesDetails
        let salesDlsObj = {
            "pName": String(type?.value == 2 ? `${values?.title?.value} ${values?.Name}` : pDetails?.PName),
            "age": String(type?.value == 2 ? `${values?.Age} ${values?.AgeType?.value}` : pDetails?.AgeGender.split("/")[0]),
            "address": String(type?.value == 2 ? values?.Address ? values?.Address : "" : pDetails?.Address),
            "gender": String(type?.value == 2 ? `${values?.Gender?.value}` : pDetails?.AgeGender.split("/")[1]),
            "contactNo": String(type?.value == 2 ? values?.ContactNo ? values?.ContactNo : "" : pDetails?.ContactNo),
            "perUnitSellingPrice": Number(val?.MRP),
            "indentNo": String(val?.IndentNo),
            "gstType": String(val?.GSTType ? val?.GSTType : ""),
            "taxPercent": Number(val?.PurTaxPer ? val?.PurTaxPer : 0),
            "draftDetailID": Number(val?.draftID ? val?.draftID : "")
        }
        salesDetails.push(salesDlsObj)

        // patientMedicineData
        let patMedObj = { "patientMedicine_ID": Number(val?.patientMedicine ? val?.patientMedicine : 0) }
        patientMedicineData.push(patMedObj)

        // draftMedicineData
        let DraftMedDataObj = {
            "draftDetailID": Number(val?.draftID ? val?.draftID : ""),
            "receiveQty": Number(val?.Quantity ? val?.Quantity : "0")
        }
        draftMedicineData.push(DraftMedDataObj)

        // clinicalTrial
        if (val?.isClinicalTrial) {
            let clinicalTrialObj = {
                "itemID": String(val?.ItemID),
                "remarks": String(val?.ClinicalRemark ? val?.ClinicalRemark : "")
            }
            clinicalTrial.push(clinicalTrialObj)
        }

    })


    let finalobj = {
        "patientType": String(type?.value),
        "deptLedgerNo": userData?.deptLedgerNo,
        "contactNo": String(pDetails?.ContactNo ? pDetails?.ContactNo : ""),
        "pName": String(pDetails?.PName ? pDetails?.PName : ""),
        "isOtPatient": 0,
        "isIPDInCash": false,
        "isDischargeMedicine": Number(values?.DisMed?.value ? values?.DisMed?.value : 0),
        "pageURL": pageURL,
        "ipAddress": ip,
        "verifiedUserID": userData?.employeeID,
        pmh: pmh,
        lt: lt,
        ltd: ltd,
        salesDetails: salesDetails,
        paymentDetail: paymentDetail,
        patientMedicineData: patientMedicineData,
        draftMedicineData: draftMedicineData,
        clinicalTrial: clinicalTrial
    }
    return finalobj
}

export const DraftPharmecyAPIPayload = (pDetails, itemList, values, BindResource) => {

    console.log("pDetails", pDetails)
    console.log("itemList", itemList)
    console.log("values", values)

    const { type, Panel, Doctor } = values
    let draftDetails = {
        // "id": 0,
        "patientID": String(type?.value == 2 ? "CASH002" : pDetails?.PatientID ? pDetails?.PatientID : ""),
        "pFirstName": String(type?.value == 2 ? `${values?.title?.value} ${values?.Name}` : pDetails?.PName),
        "pLastName": String(type?.value == 2 ? `${values?.title?.value} ${values?.Name}` : pDetails?.PName),
        "pName": String(type?.value == 2 ? `${values?.title?.value} ${values?.Name}` : pDetails?.PName),
        "panelID": String(Panel?.PanelID ? Panel?.PanelID : 1),
        "title": String(type?.value == 2 ? `${values?.title?.value}` : pDetails?.Title),
        "age": String(type?.value == 2 ? `${values?.Age} ${values?.AgeType?.value}` : pDetails?.AgeGender.split("/")[0]),
        "mobile": String(type?.value == 2 ? values?.ContactNo ? values?.ContactNo : "" : pDetails?.ContactNo),
        "email": "",
        "doctorID": String(type?.value == 2 ? BindResource?.DoctorID_Self : pDetails?.DoctorID ? pDetails?.DoctorID : "0"),
        "address": String(type?.value == 2 ? values?.Address ? values?.Address : "" : pDetails?.Address),
        "centreID": userData?.centreID
    }

    let draftItemDetails = []
    itemList?.map((val, index) => {
        let obj = {
            // "id": Number(val?.ItemID),
            "draftID": Number(val?.draftID ? val?.draftID : 0),
            "itemID": String(val?.ItemID),
            "discountpercent": Number(val?.DisPer ? val?.DisPer : 0),
            "stockID": String(val?.stockid ? val?.stockid : "0"),
            "quantity": Number(val?.Quantity ? val?.Quantity : "0")
        }
        draftItemDetails.push(obj)
    })

    return { draftDetails: draftDetails, draftItemDetails: draftItemDetails }
}


export const ReturnPayload = (itemList, paymentMethod, paymentDetails, values, hashcode) => {
    console.log("itemList", itemList)
    console.log("paymentMethod", paymentMethod)
    console.log("paymentDetails", paymentDetails)
    console.log("values", values)

    let { Patient_Type, ReceiptNo, PatientID, MRP, returnQty, ItemID, Type_ID, GSTType, ItemName, SubCategoryID, DiscountPercentage, IGSTPercent, CGSTPercent, SGSTPercent, IsPackage, TaxPercent, PerUnitBuyPrice, StockID, BillNo, IsUsable, ToBeBilled, MedExpiryDate, IsExpirable, HSNCode, LedgerTransactionNo, CustomerID, IPNo, BatchNumber } = { ...itemList[0] }

    let pmh = []
    let lt = []
    let ltd = []

    itemList?.map((val, index) => {
        if (index === 0) {
            let pmhObj = {
                "patientID": String(val?.PatientID ? val?.PatientID : ""),
                "panelID": Number(val?.PanelID ? val?.PanelID : 1),
                "hashCode": hashcode
            }
            pmh.push(pmhObj)

            let ltObj = {
                "grossAmount": Number(paymentDetails?.billAmount ? paymentDetails?.billAmount : 0),
                "discountOnTotal": Number(paymentDetails?.discountAmount ? paymentDetails?.discountAmount : 0),
                "netAmount": Number(paymentDetails?.netAmount ? paymentDetails?.netAmount : 0),
                "adjustment": Number(paymentDetails?.paidAmount ? paymentDetails?.paidAmount : 0),
                "discountReason": Number(paymentDetails?.discountAmount) > 0 ? String(paymentDetails?.discountReason ? paymentDetails?.discountReason : "") : "",
                "discountApproveBy": Number(paymentDetails?.discountAmount) > 0 ? String(paymentDetails?.discountApproveBy ? paymentDetails?.discountApproveBy : "") : "",
                "roundOff": String(paymentDetails?.roundOff ? paymentDetails?.roundOff : "0"),
                "uniqueHash": hashcode,
                "isCancel": "0",
                "remarks": "test",
                "govTaxAmount": 0,
                "govTaxPer": 0,
                "refund_Against_BillNo": String(BillNo ? BillNo : ''),
                "ipNo": String(IPNo ? IPNo : ""),
                "patientType": String(Patient_Type ? Patient_Type : "")
            }
            lt.push(ltObj)
        }
        if (val?.returnQty !== 0) {
            let ltdobj = {
                "rate": Number(MRP ? MRP : 0),
                "quantity": Number(returnQty ? returnQty : 0),
                "itemID": ItemID,
                "type_ID": String(Type_ID ? Type_ID : 0),
                "gstType": String(GSTType ? GSTType : ""),
                "itemName": String(ItemName ? ItemName : ""),
                "subCategoryID": String(SubCategoryID ? SubCategoryID : 0),
                "discountPercentage": Number(DiscountPercentage),
                "igstPercent": Number(IGSTPercent ? IGSTPercent : 0),
                "cgstPercent": Number(CGSTPercent ? CGSTPercent : 0),
                "sgstPercent": Number(SGSTPercent),
                "isPackage": Number(IsPackage ? IsPackage : 0),
                "taxPercent": Number(TaxPercent ? TaxPercent : 0),
                "unitPrice": Number(PerUnitBuyPrice ? PerUnitBuyPrice : 0),
                "purTaxPer": Number(TaxPercent ? TaxPercent : 0),
                "stockID": String(StockID ? StockID : 0),
                "batchNumber": String(BatchNumber ? BatchNumber : ""),
                "isReusable": String(IsUsable ? IsUsable : ""),
                "toBeBilled": Number(ToBeBilled ? ToBeBilled : 0),
                "medExpiryDate": String(MedExpiryDate),
                "isExpirable": String(IsExpirable ? IsExpirable : 0),
                "hsnCode": String(HSNCode ? HSNCode : ""),
                "ledgerTransactionNo": String(LedgerTransactionNo ? LedgerTransactionNo : "0"),
                "refund_Against_BillNo": String(BillNo ? BillNo : "")
            }
            ltd.push(ltdobj)
        }
    })

    let paymentDetail = payloadSettlerForPaymentGateWay(paymentMethod)

    let paylaod = {
        "patientType": Patient_Type ? Patient_Type : "",
        "ledgerno": LedgerTransactionNo ? LedgerTransactionNo : "",
        "receiptNo": ReceiptNo ? ReceiptNo : "",
        "customerID": CustomerID ? CustomerID : "",
        "ipAddress": ip,
        "pageURL": pageURL,
        "pmh": pmh,
        "lt": lt,
        "ltd": ltd,
        "paymentDetail": paymentDetail
    }

    return paylaod
}

export const ReturnIPDPayload = (itemList, paymentMethod, paymentDetails, values) => {

    let returnItem = []

    console.log("itemList", itemList)
    console.log("paymentMethod", paymentMethod)
    console.log("paymentDetails", paymentDetails)
    console.log("values", values)

    itemList?.filter((val) => Number(val?.returnQty) > 0)?.map((val) => {
        // if (Number(val?.returnQty) > 0) {
        const { ID, ItemID, SubCategoryID, StockID, ItemName, IsPackage, PackageID, Type_ID, ToBeBilled, ServiceItemID, IsVerified, IsExpirable, MedExpiryDate, BatchNumber, returnQty, RejectQty, LedgerNumber, Amount, MRP, SaleTaxPercent, UnitPrice, PurTaxPer, IGSTPercent, CGSTPercent, SGSTPercent, HSNCode, GSTType } = { ...val }
        let obj = {
            "id": String(ID),
            "itemID": String(ItemID ? ItemID : 0),
            "subCategoryID": String(SubCategoryID ? SubCategoryID : "0"),
            "stockID": String(StockID ? StockID : ""),
            "itemName": String(ItemName ? ItemName : ""),
            "isPackage": String(IsPackage ? IsPackage : ""),
            "packageID": String(PackageID ? PackageID : ""),
            "type_ID": String(Type_ID ? Type_ID : ""),
            "toBeBilled": String(ToBeBilled ? ToBeBilled : ""),
            "serviceItemID": String(ServiceItemID ? ServiceItemID : ""),
            "isVerified": String(IsVerified ? IsVerified : ""),
            "isExpirable": String(IsExpirable ? IsExpirable : ""),
            "medExpiryDate": String(MedExpiryDate),
            "batchNumber": String(BatchNumber),
            "retQty": String(returnQty ? returnQty : "0"),
            "rejectQty": String(RejectQty ? RejectQty : "0"),
            "billNo": "",//ise nhi bhejna hai
            "ledgerNumber": String(LedgerNumber),
            "amount": Number(Amount),
            "mrp": Number(MRP),
            "taxPercent": Number(SaleTaxPercent),
            "unitPrice": String(UnitPrice),
            "purTaxPer": String(PurTaxPer),
            "igstPercent": String(IGSTPercent ? IGSTPercent : "0"),
            "cgstPercent": String(CGSTPercent ? CGSTPercent : "0"),
            "sgstPercent": String(SGSTPercent ? SGSTPercent : "0"),
            "hsnCode": String(HSNCode ? HSNCode : ""),
            "gstType": String(GSTType ? GSTType : "")
        }
        returnItem.push(obj)
        // }
    })

    const { Title, PName, Age, Address, Gender, contactNo, PatientID, TransactionID, patient_type, PanelID, IPDCaseTypeID, RoomID } = { ...itemList[0] }

    let payload = {
        "pName": PName.split(Title)[1],
        "age": Age,
        "address": String(Address ? Address : ""),
        "gender": String(Gender ? Gender : ""),
        "contactNo": String(contactNo ? contactNo : ""),
        "transactionNo": TransactionID,
        "patientID": PatientID,
        "indentNumber": "",
        "indent_Dpt": "",
        "patient_Type": patient_type,
        "panelID": String(PanelID ? PanelID : 1),
        "roomID": Number(RoomID ? RoomID : "0"),
        "caseTypeID": Number(IPDCaseTypeID ? IPDCaseTypeID : ""),
        "ipAddress": ip,
        "pageUrl": pageURL,
        "returnItem": returnItem
    }
    return payload
}
export const PharmacyFinalSettlementPayload = (itemList, paymentMethod, paymentControl, values, hashCode) => {

    let paymentDetail = payloadSettlerForPaymentGateWay(paymentMethod)
    console.log("itemList", itemList)
    console.log("paymentControl", paymentControl)
    console.log("values", values)

    let dataOPDDiscount = []
    itemList?.map((val) => {
        let obj = {
            "netAmount": Number(val?.PendingAmt),
            "discountReason": "",
            "discountApproveBy": "",
            "discountOnTotal": 0,
            "roundOff": Number(paymentControl?.roundOff),
            "adjustment": 0,
            "discAmt": 0,
            "discountPercentage": 0
        }
        dataOPDDiscount.push(obj)
    })
    let { IsNewPatient, FeesPaid, TypeOfTnx, PanelID, TransactionID, PatientID, LedgerTransactionNo,PendingAmt } = itemList[0]
    let payload = {
        "dataPaymentDetail": paymentDetail,
        "dataOPDDiscount": dataOPDDiscount,
        "hashCode": hashCode,
        "amountPaid": String(paymentControl?.paidAmount),
        "patientID": String(PatientID),
        "transactionID": String(TransactionID),
        "ledgerTranNo": String(LedgerTransactionNo),
        "naration": "Remark",
        "panelID": Number(PanelID ? PanelID : ''),
        "isRefund": PendingAmt > 0 ? "0" : "1",
        "netAmount": String(PendingAmt),
        "advanceAmt": Number(0),
        "typeOfTnx": String(TypeOfTnx ? TypeOfTnx : ""),
        "feePaid": String(FeesPaid ? FeesPaid : ""),
        "isNewPatient": Number(IsNewPatient ? IsNewPatient : "0"),
        "centreId": Number(userData?.defaultCentre),
        "ipAddress": ip
    }

    return payload

}