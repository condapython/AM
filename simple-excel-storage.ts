import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { 
  type Contact,
  type InsertContact,
  type Newsletter,
  type InsertNewsletter,
  type ChatMessage,
  type InsertChatMessage,
  type User,
  type InsertUser
} from "@shared/schema";
import { IStorage } from "./storage";

const EXCEL_DIR = path.join(process.cwd(), 'excel-data');
const CONTACTS_FILE = path.join(EXCEL_DIR, 'contacts.xlsx');
const NEWSLETTERS_FILE = path.join(EXCEL_DIR, 'newsletters.xlsx');
const CHAT_MESSAGES_FILE = path.join(EXCEL_DIR, 'chat-messages.xlsx');

// Ensure directory exists
if (!fs.existsSync(EXCEL_DIR)) {
  fs.mkdirSync(EXCEL_DIR, { recursive: true });
}

interface ExcelContact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  service: string;
  message: string;
  createdAt: string;
}

interface ExcelNewsletter {
  id: number;
  email: string;
  createdAt: string;
}

interface ExcelChatMessage {
  id: number;
  sessionId: string;
  message: string;
  response: string;
  createdAt: string;
}

export class SimpleExcelStorage implements IStorage {
  private getNextId(filePath: string): number {
    if (!fs.existsSync(filePath)) {
      return 1;
    }
    
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      
      if (data.length === 0) {
        return 1;
      }
      
      const maxId = Math.max(...data.map((row: any) => row.id || 0));
      return maxId + 1;
    } catch (error) {
      return 1;
    }
  }

  private writeToExcel(filePath: string, data: any[]) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, filePath);
  }

  private readFromExcel(filePath: string): any[] {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      return XLSX.utils.sheet_to_json(worksheet);
    } catch (error) {
      return [];
    }
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contacts = this.readFromExcel(CONTACTS_FILE) as ExcelContact[];
    const id = this.getNextId(CONTACTS_FILE);
    const createdAt = new Date();
    
    const excelContact: ExcelContact = {
      id,
      firstName: insertContact.firstName,
      lastName: insertContact.lastName,
      email: insertContact.email,
      company: insertContact.company || '',
      service: insertContact.service || '',
      message: insertContact.message || '',
      createdAt: createdAt.toISOString()
    };
    
    contacts.push(excelContact);
    this.writeToExcel(CONTACTS_FILE, contacts);
    
    const contact: Contact = {
      id,
      firstName: insertContact.firstName,
      lastName: insertContact.lastName,
      email: insertContact.email,
      company: insertContact.company || null,
      service: insertContact.service || null,
      message: insertContact.message || null,
      createdAt
    };
    
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    const excelContacts = this.readFromExcel(CONTACTS_FILE) as ExcelContact[];
    return excelContacts.map(contact => ({
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      company: contact.company || null,
      service: contact.service || null,
      message: contact.message || null,
      createdAt: new Date(contact.createdAt)
    }));
  }

  // Newsletter methods
  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const newsletters = this.readFromExcel(NEWSLETTERS_FILE) as ExcelNewsletter[];
    const id = this.getNextId(NEWSLETTERS_FILE);
    const createdAt = new Date();
    
    const excelNewsletter: ExcelNewsletter = {
      id,
      email: insertNewsletter.email,
      createdAt: createdAt.toISOString()
    };
    
    newsletters.push(excelNewsletter);
    this.writeToExcel(NEWSLETTERS_FILE, newsletters);
    
    const newsletter: Newsletter = {
      id,
      email: insertNewsletter.email,
      subscribed: true,
      createdAt
    };
    
    return newsletter;
  }

  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    const excelNewsletters = this.readFromExcel(NEWSLETTERS_FILE) as ExcelNewsletter[];
    return excelNewsletters.map(newsletter => ({
      id: newsletter.id,
      email: newsletter.email,
      subscribed: true,
      createdAt: new Date(newsletter.createdAt)
    }));
  }

  // Chat message methods
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const messages = this.readFromExcel(CHAT_MESSAGES_FILE) as ExcelChatMessage[];
    const id = this.getNextId(CHAT_MESSAGES_FILE);
    const createdAt = new Date();
    
    const excelMessage: ExcelChatMessage = {
      id,
      sessionId: insertMessage.sessionId,
      message: insertMessage.message,
      response: '',
      createdAt: createdAt.toISOString()
    };
    
    messages.push(excelMessage);
    this.writeToExcel(CHAT_MESSAGES_FILE, messages);
    
    const message: ChatMessage = {
      id,
      sessionId: insertMessage.sessionId,
      message: insertMessage.message,
      response: null,
      createdAt
    };
    
    return message;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    const excelMessages = this.readFromExcel(CHAT_MESSAGES_FILE) as ExcelChatMessage[];
    return excelMessages
      .filter(msg => msg.sessionId === sessionId)
      .map(msg => ({
        id: msg.id,
        sessionId: msg.sessionId,
        message: msg.message,
        response: msg.response || null,
        createdAt: new Date(msg.createdAt)
      }));
  }

  async updateChatMessageResponse(id: number, response: string): Promise<ChatMessage | undefined> {
    const messages = this.readFromExcel(CHAT_MESSAGES_FILE) as ExcelChatMessage[];
    const messageIndex = messages.findIndex(msg => msg.id === id);
    
    if (messageIndex === -1) {
      return undefined;
    }
    
    messages[messageIndex].response = response;
    this.writeToExcel(CHAT_MESSAGES_FILE, messages);
    
    return {
      id: messages[messageIndex].id,
      sessionId: messages[messageIndex].sessionId,
      message: messages[messageIndex].message,
      response: messages[messageIndex].response,
      createdAt: new Date(messages[messageIndex].createdAt)
    };
  }

  // User methods (basic implementation for compatibility)
  async getUser(id: number): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: 1,
      username: insertUser.username,
      password: insertUser.password
    };
    return user;
  }
}