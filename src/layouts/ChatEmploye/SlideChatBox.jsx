import React, { useEffect, useRef, useState } from "react";
import "./ChatSection.css";
import { DownSVG, UserNotFoundSVG } from "../../components/SvgIcons";
import AvatorImg from "./AvatorImg";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
import SearchChat from "./SearchChat";
import SponsoredSection from "./SponsoredSection";
import { ChatHubChatTicket } from "../../networkServices/chatAPI";
import SpinnerLoading from "./SpinnerLoading";
import EmployeeChatSection from "./EmployeeChatSection";

function SlideChatBox({ toggleChat, isOpen }) {
  const { employeePhoto } = useLocalStorage("userData", "get");
  const [chatData, setChatData] = useState([]);
  const [startLimit, setStartLimit] = useState(0);
  const [endLimit, setEndLimit] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const chatContentRef = useRef(null);
  const [singleEmployeeData, setSingleEmployeeData] = useState({});

  const handleChatHubChatTicket = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        type: 1,
        toEmployeeID: "",
        startLimit,
        endLimit,
      };
      const response = await ChatHubChatTicket(requestBody); // Your API call function
      // setChatData((prevData)=>([...prevData,response?.data])) 
      setChatData(response?.data)

    } catch (error) {
      console.error("Error fetching chat data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleChatHubChatTicket();
  }, [startLimit, endLimit]);

  const handleScroll = () => {
    const chatContent = chatContentRef.current;
    if (
      chatContent.scrollTop + chatContent.clientHeight >=
      chatContent.scrollHeight - 10 &&
      !isLoading
    ) {
      // Update limits for the next API call
      setStartLimit((prevStart) => prevStart + 20);
      setEndLimit((prevEnd) => prevEnd + 20);
    }
  };

  const handleEmployeeWiseChat = (item) => {
    setSingleEmployeeData(item);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const handleCloseChat = () => {
    setSingleEmployeeData({});
    handleChatHubChatTicket()
  };
  const handleUserSearch = (e) => {
    if (!e.target?.value) handleChatHubChatTicket()
    let data = chatData?.filter((val) => val?.EmployeeName?.toLowerCase()?.includes(e.target?.value?.toLowerCase()))
    setChatData(data)
  }

  return (
    <div className="chat-container">
      {Object.keys(singleEmployeeData)?.length > 0 ? (
        <EmployeeChatSection
          singleEmployeeData={singleEmployeeData}
          handleCloseChat={handleCloseChat}
        />
      ) : (
        <div className={`chat-section ${isOpen ? "open" : "closed"}`}>
          <div className="chat-header">
            <div>
              <AvatorImg imageUrl={employeePhoto} />
              <span className="mx-2">Messaging</span>
            </div>
            <div onClick={() => toggleChat(false)}>
              <DownSVG />
            </div>
          </div>

          <div
            className="chat-content"
            ref={chatContentRef}
            onScroll={handleScroll}
          >
            <SearchChat chatData={chatData} handleUserSearch={handleUserSearch} />
            <div>
              {chatData?.length > 0 ? chatData.map((item, index) => {
                return (
                  <SponsoredSection
                    data={item}
                    key={index}
                    handleEmployeeWiseChat={handleEmployeeWiseChat}
                  />
                );
              }) : <div className="d-flex justify-content-center align-items-center mt-5">
                <UserNotFoundSVG /> User not found
              </div>}

              {isLoading && (
                <div className="text-center mt-2">
                  <SpinnerLoading />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SlideChatBox;
