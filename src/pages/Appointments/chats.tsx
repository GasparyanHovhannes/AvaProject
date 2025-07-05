import { useEffect, useState, useRef } from "react";
import { List, Avatar, Layout, Typography, Spin, Button, Input, message as AntdMessage } from "antd";
import { collection, getDocs, query, where, addDoc, orderBy } from "firebase/firestore";
import { PaperClipOutlined } from "@ant-design/icons";
import { db } from "../../services/apiService";
import { useAppSelector } from "../../app/hooks";

const { Sider, Content } = Layout;
const { Title } = Typography;

export default function Chats() {
  const user = useAppSelector(state => state.user.data);
  const userEmail = user?.email;
  const userRole = useAppSelector(state => state.user.role); // "doctor" или "patient"
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Получаем список собеседников с которыми есть чаты
  useEffect(() => {
    async function fetchContacts() {
      setLoading(true);

      let chatsSnap;
      let contactEmails: string[] = [];
      let contactsSnap;
      let allContacts: any[] = [];

      if (userRole === "doctor") {
        // Для доктора: ищем чаты, где doctor_id = userEmail, собеседники — пациенты (по email)
        chatsSnap = await getDocs(query(
          collection(db, "chats"),
          where("doctor_id", "==", userEmail)
        ));
        contactEmails = chatsSnap.docs.map(doc => doc.data().user_id);
        if (contactEmails.length === 0) {
          setContacts([]);
          setLoading(false);
          return;
        }
        contactsSnap = await getDocs(collection(db, "users"));
        allContacts = contactsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setContacts(allContacts.filter(u => contactEmails.includes(u.email)));
      } else {
        // Для пациента: ищем чаты, где user_id = userEmail, собеседники — доктора (по email)
        chatsSnap = await getDocs(query(
          collection(db, "chats"),
          where("user_id", "==", userEmail)
        ));
        contactEmails = chatsSnap.docs.map(doc => doc.data().doctor_id);
        if (contactEmails.length === 0) {
          setContacts([]);
          setLoading(false);
          return;
        }
        contactsSnap = await getDocs(collection(db, "doctor"));
        allContacts = contactsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setContacts(allContacts.filter(doc => contactEmails.includes(doc.email)));
      }
      setLoading(false);
    }
    if (userEmail && userRole) fetchContacts();
  }, [userEmail, userRole]);

  // Получаем chat_id для выбранного собеседника
  useEffect(() => {
    async function fetchChatId() {
      setMessages([]);
      setChatId(null);
      if (!activeChat || !userEmail || !userRole) return;
      let chatsSnap;
      if (userRole === "doctor") {
        chatsSnap = await getDocs(query(
          collection(db, "chats"),
          where("doctor_id", "==", userEmail),
          where("user_id", "==", activeChat.email)
        ));
      } else {
        chatsSnap = await getDocs(query(
          collection(db, "chats"),
          where("user_id", "==", userEmail),
          where("doctor_id", "==", activeChat.email)
        ));
      }
      if (!chatsSnap.empty) {
        setChatId(chatsSnap.docs[0].id);
      }
    }
    fetchChatId();
  }, [activeChat, userEmail, userRole]);

  // Получаем сообщения для выбранного чата
  useEffect(() => {
    async function fetchMessages() {
      setMessages([]);
      if (!chatId) return;
      const messagesSnap = await getDocs(query(
        collection(db, "messages"),
        where("chat_id", "==", chatId),
        orderBy("created_at", "asc")
      ));
      setMessages(messagesSnap.docs.map(doc => doc.data()));
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
    fetchMessages();
  }, [chatId]);

  // Отправка сообщения
  const handleSend = async () => {
    if (!input.trim() || !chatId) return;
    setSending(true);
    try {
      await addDoc(collection(db, "messages"), {
        chat_id: chatId,
        text: input,
        image: null,
        created_at: new Date(),
        sender_email: userEmail,
      });
      setInput("");
      // Обновить сообщения после отправки
      const messagesSnap = await getDocs(query(
        collection(db, "messages"),
        where("chat_id", "==", chatId),
        orderBy("created_at", "asc")
      ));
      setMessages(messagesSnap.docs.map(doc => doc.data()));
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (e) {
      AntdMessage.error("Ошибка отправки сообщения");
    }
    setSending(false);
  };

  // Открыть чат с собеседником
  const handleSelectContact = (contact: any) => {
    setActiveChat(contact);
  };

  return (
    <Layout style={{ height: "80vh", background: "#fff", borderRadius: 8, overflow: "hidden" }}>
      <Sider width="18%" style={{ background: "#f5f5f5", padding: 16, minWidth: 120 }}>
        <Title level={4} style={{ marginBottom: 16 }}>
          {userRole === "doctor" ? "Пациенты" : "Доктора"}
        </Title>
        {loading ? (
          <Spin />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={contacts}
            renderItem={contact => (
              <List.Item
                style={{
                  background: activeChat?.id === contact.id ? "#e6f7ff" : "#fff",
                  cursor: "pointer",
                  borderRadius: 6,
                  marginBottom: 4,
                  padding: 8,
                }}
                onClick={() => handleSelectContact(contact)}
              >
                <List.Item.Meta
                  avatar={<Avatar src={contact.avatar || undefined}>{contact.name?.[0]}</Avatar>}
                  title={contact.name}
                  description={contact.email}
                />
              </List.Item>
            )}
          />
        )}
      </Sider>
      <Content style={{ padding: 24, minHeight: 280, display: "flex", flexDirection: "column", height: "80vh" }}>
        {activeChat ? (
          <>
            <Title level={4}>
              {userRole === "doctor"
                ? `Чат с пациентом ${activeChat.name}`
                : `Чат с доктором ${activeChat.name}`}
            </Title>
            <div style={{ flex: 1, overflowY: "auto", marginBottom: 16, background: "#fafafa", borderRadius: 8, padding: 16 }}>
              {messages.length === 0 ? (
                <div style={{ color: "#888", textAlign: "center", marginTop: 40 }}>
                  Нет сообщений
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} style={{
                    marginBottom: 12,
                    textAlign: msg.sender_email === userEmail ? "right" : "left"
                  }}>
                    <div style={{
                      display: "inline-block",
                      background: msg.sender_email === userEmail ? "#e6f7ff" : "#f0f0f0",
                      borderRadius: 8,
                      padding: "8px 14px",
                      maxWidth: "70%",
                      wordBreak: "break-word"
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                icon={<PaperClipOutlined />}
                style={{ marginRight: 8 }}
                disabled
              />
              <Input
                style={{ flex: 1, marginRight: 8 }}
                value={input}
                onChange={e => setInput(e.target.value)}
                onPressEnter={handleSend}
                placeholder="Введите сообщение..."
                disabled={sending}
              />
              <Button type="primary" onClick={handleSend} loading={sending}>
                Send
              </Button>
            </div>
          </>
        ) : (
          <div style={{ color: "#888", marginTop: 100, textAlign: "center" }}>
            {userRole === "doctor"
              ? "Выберите пациента для начала чата"
              : "Выберите доктора для начала чата"}
          </div>
        )}
      </Content>
    </Layout>
  );
}