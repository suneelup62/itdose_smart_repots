import React, { useEffect, useState, useRef } from "react";
import AvatorImg from "./AvatorImg";
import { DownSVG, MinimizeSVG, OnlineUserIconSVG, ReadUnreadMessageSVG, SendSVG } from "../../components/SvgIcons";
import Input from "../../components/formComponent/Input";
import logoAadmiMan from "../../assets/image/logoAadmiMan.gif";
import {
  ChatHubChatTicket,
  ChatHubSaveChat,
} from "../../networkServices/chatAPI";
import SpinnerLoading from "./SpinnerLoading";
import {
  setupSignalRConnection,
  startSignalRConnection,
  stopSignalRConnection,
} from "./signalRService";
import { HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from "@microsoft/signalr";
import moment from "moment";


const EmployeeChatSection = ({ singleEmployeeData, handleCloseChat }) => {
  const [PreviousChatData, setPreviousChatData] = useState([]);
  const [chatMsg, setChatMsg] = useState("");
  const chatEndRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // Scroll to the bottom of chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const handleChatHubSaveChat = async (e) => {
  //   e.preventDefault();
  //   if (chatMsg) {
  //     try {
  //       const requestBody = {
  //         toEmployeeID: singleEmployeeData?.EmployeeID,
  //         message: chatMsg,
  //         attachmentURL: "",
  //       };
  //       const response = await ChatHubSaveChat(requestBody);
  //       if (response?.success) {
  //         handleEmployeeWiseChat(singleEmployeeData);
  //         setChatMsg("");
  //       }
  //     } catch (error) {
  //       console.log(error, "SomeThing Went Wrong");
  //     }
  //   }
  // };

  const handleEmployeeWiseChat = async (item) => {
    setLoading(true);
    try {
      const requestBody = {
        type: 2,
        toEmployeeID: String(item?.EmployeeID),
        startLimit: 0,
        endLimit: 2000,
      };
      const response = await ChatHubChatTicket(requestBody);
      setPreviousChatData(response?.data?.reverse());
    } catch (error) {
      console.log(error, "SomeThing Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleEmployeeWiseChat(singleEmployeeData);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [PreviousChatData]);


  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [hubConnection, setHubConnection] = useState(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://itd2.fw.ondgni.com:70/ChatAPI/Chathub", {
        transport: signalR.HttpTransportType.WebSockets // Force WebSocket transport
      })
      .build();

    connection.start()
      .then(() => {
        console.log("Connected to SignalR hub.");

        // Listen for messages from the server
        connection.on("ReceiveMessage", (user, message) => {
          setMessages(prevMessages => [...prevMessages, `${user}: ${message}`]);
        });
      })
      .catch((err) => {
        console.error("Error while starting connection: ", err);
      });

    setHubConnection(connection);

    return () => {
      if (hubConnection) {
        hubConnection.stop();
      }
    };
  }, []);

  const handleChatHubSaveChat = async (e) => {
    e.preventDefault();
    if (chatMsg) {
      try {
        const requestBody = {
          ToEmployeeID: singleEmployeeData?.EmployeeID,
          Message: chatMsg,
          attachmentURL: "",
        };
        hubConnection.invoke("SendMessage", requestBody)
          .then(() => {
            console.log("Message sent.");
          })
          .catch((err) => {
            console.error("Error while sending message: ", err);
          });
      } catch (error) {
        console.log(error, "SomeThing Went Wrong");
      }
    }
  };

  const handleShowDateCon = (items, index) => {
    if ((items?.EntryDateTime?.split(" ")[0] !== PreviousChatData[index - 1]?.EntryDateTime?.split(" ")[0])) {
      return true
    }

  }

  return (
    <div
      className={`section-EmployeeChat chat-section ${Object.keys(singleEmployeeData)?.length > 0 ? "open" : "closed"}`}
    >
      <div className="employee-chat-header">
        <div className="d-flex">
          <div>
            <AvatorImg
              imageUrl={singleEmployeeData?.EmployeePhoto || logoAadmiMan}
            />
          </div>

          <div className="position-relative">
            <span className="mx-2">{singleEmployeeData?.EmployeeName}</span>
            <span className="mx-2 LastSeenChat"> {singleEmployeeData?.LoginStatus === "Online" && <OnlineUserIconSVG />} {singleEmployeeData?.LoginStatus}</span>
          </div>


        </div>
        <div>
          <DownSVG />
          <span onClick={handleCloseChat}>
            <MinimizeSVG />
          </span>
        </div>
      </div>
      {loading ? (
        <div className="text-center mt-2">
          <SpinnerLoading />
        </div>
      ) : (
        <>
          <div className="main-section-chatting p-1">
            {PreviousChatData?.map((items, index) => (
              <div key={index}>
                {(handleShowDateCon(items, index))
                  && <p className="d-flex justify-content-center align-items-center">
                    <span className="date-on-chatbox">
                      {items?.EntryDateTime?.split(" ")[0]}
                    </span></p>}

                <div
                  key={index}
                  className={`message ${items?.MessageStatus === "Sent" ? "user-message" : "bot-message"}`}
                >
                  {items?.Message}
                  <span className="ml-3 EntryDateTime">{items?.EntryDateTime.split(" ")[1]}</span>
                  {/* <span className="ml-3 EntryDateTime">{moment(new Date(items?.EntryDateTime)).format("hh:mm A")}</span> */}

               

                  {items?.MessageStatus === "Sent" && <span aria-hidden="false" aria-label=" Read " data-icon="msg-dblcheck" class={`${items?.IsSeen ? "isSeenMessage" : ""}`}>
                    <ReadUnreadMessageSVG />
                  </span>
                  }
                </div>
              </div>
            ))}
            {/* This div keeps chat view scrolled to the bottom */}
            <div ref={chatEndRef} />
          </div>

          <div className="footer-section-chatting p-1">
            <form onSubmit={handleChatHubSaveChat}>
              <div className="d-flex align-items-center">
                <Input
                  className="form-control"
                  s
                  removeFormGroupClass={true}
                  placeholder={"Send Message"}
                  respclass={"w-100"}
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                />
                <div className="p-1" onClick={handleChatHubSaveChat}>
                  <SendSVG />
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeChatSection;
