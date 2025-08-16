import React, { useState, useEffect } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { createChatBotMessage } from "react-chatbot-kit";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Box } from "@mui/material";
import "../Chatbot/chatbot.css";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bounce, setBounce] = useState(false);
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setBounce(false); // stop bouncing when opened
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setBounce(true);
    }, 3000); // ← change to 3 seconds for testing

    return () => clearTimeout(timer);
  }, []);

  // Bot config
  const config = {
    botName: "Tecject Bot",
    initialMessages: [
      createChatBotMessage("👋 Hello! How can I help you today?"),
    ],
    customStyles: {
      botMessageBox: {
        backgroundColor: "#007bff",
      },
      chatButton: {
        backgroundColor: "#007bff",
      },
    },
  };

  // ActionProvider
  class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }

    greet() {
      const message = this.createChatBotMessage("Hello! How can I assist you?");
      this.addMessageToState(message);
    }

    faq(messageText) {
      let response = "";
      const lower = messageText.toLowerCase();

      if (lower.includes("Purchase") || lower.includes("project")) {
        response = "📝 You can purchase project my clicking on project .";
      } else if (lower.includes("receipt")) {
        response =
          '🧾 To view your receipts, go to the "Purchased" section in your profile.';
      } else if (lower.includes("login") || lower.includes("account")) {
        response =
          '🔐 Click on the "Login" button in the top right corner to sign in or create an account.';
      } else if (lower.includes("contact") || lower.includes("support")) {
        response =
          "📧 You can reach us via the Contact page or email us at support@tecject.in.";
      } else if (lower.includes("project") && lower.includes("types")) {
        response =
          "📂 We support Mini, Main, Enterprise, and Professional projects.";
      } else if (lower.includes("payment") || lower.includes("pay")) {
        response =
          "💳 Payments are accepted online. A receipt will be emailed after payment.";
      } else if (
        lower.includes("ppt") ||
        lower.includes("pdf") ||
        lower.includes("documentation")
      ) {
        response =
          "📑 You will receive a PPT and final report for your main project.";
      } else if (
        lower.includes("trustable") ||
        lower.includes("trust") ||
        lower.includes("loyal")
      ) {
        response =
          "✅ Tecject is a reliable and trusted platform. Your projects are in good hands.";
      } else if (lower.includes("contact") || lower.includes("connect")) {
        response =
          "you can contact via clicking the logo at the bottom or dial 9345202170";
      } else if (lower.includes("customized") || lower.includes("custom")) {
        response = "Here customized project is also done in the way you like";
      } else if (lower.includes("domain")) {
        response =
          "To explore on project click on the domain picture in main project page via project option at top";
      } else if (lower.includes("tecject")) {
        response = "Inovative startup with creative ideas";
      } else if (lower.includes("how are you")) {
        response = "Thanks for asking . I am doing Great!";
      } else if (lower.includes("thank")) {
        response = "Welcome. It is my duty!";
      } else if((lower.includes("who")) && (lower.includes("you" )|| lower.includes('u'))){
        response = "We are techies from tecject who will provide freelance project for your growth";
      } else {
        response = `😕 Sorry, I couldn't find an answer for "${messageText}".`;
      }

      const message = this.createChatBotMessage(response);
      this.addMessageToState(message);
    }

    addMessageToState(message) {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  }

  // MessageParser
  class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }

    parse(message) {
      const lower = message.toLowerCase();
      if (lower.includes("hello") || lower.includes("hi")) {
        this.actionProvider.greet();
      } else {
        this.actionProvider.faq(message);
      }
    }
  }

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
      {!isOpen && (
        <IconButton
          onClick={toggleChatbot}
          className={bounce ? "bounce" : ""}
          sx={{
            backgroundColor: "#007bff",
            color: "white",
            "&:hover": { backgroundColor: "#0056b3" },
          }}
        >
          <ChatIcon />
        </IconButton>
      )}

      {isOpen && (
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              width: 280,
              height: 500,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              backgroundColor: "white",
              position: "relative",
            }}
          >
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </Box>
          <IconButton
            size="small"
            onClick={toggleChatbot}
            sx={{
              position: "absolute",
              top: 1,
              right: 1,
              zIndex: 10,
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "#c60000" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default FloatingChatbot;
