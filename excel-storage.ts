import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { 
  type User, 
  type InsertUser,
  type Contact,
  type InsertContact,
  type Newsletter,
  type InsertNewsletter,
  type ChatMessage,
  type InsertChatMessage
} from "@shared/schema";
import { IStorage } from "./storage";

const EXCEL_DIR = path.join(process.cwd(), 'excel-data');
const CONTACTS_FILE = path.join(EXCEL_DIR, 'contacts.xlsx');
const NEWSLETTERS_FILE = path.join(EXCEL_DIR, 'newsletters.xlsx');
const CHAT_MESSAGES_FILE = path.join(EXCEL_DIR, 'chat-messages.xlsx');
const USERS_FILE = path.join(EXCEL_DIR, 'users.xlsx');

// Ensure directory exists
if (!fs.existsSync(EXCEL_DIR)) {
  fs.mkdirSync(EXCEL_DIR, { recursive: true });
}

export class ExcelStorage implements IStorage {
  private getNextId(filePath: string): number {
    if (!fs.existsSync(filePath)) {
      return 1;
    }
    
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    if (data.length === 0) {
      return 1;
    }
    
    const maxId = Math.max(...data.map((row: any) => row.id || 0));
    return maxId + 1;
  }

  private writeToExcel(filePath: string, data: any[], headers: string[]) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Set column headers
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, filePath);
  }

  private readFromExcel(filePath: string): any[] {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contacts = this.readFromExcel(CONTACTS_FILE);
    const id = this.getNextId(CONTACTS_FILE);
    const createdAt = new Date().toISOString();
    
    const contact: Contact = {
      id,
      firstName: insertContact.firstName,
      lastName: insertContact.lastName,
      email: insertContact.email,
      company: insertContact.company || null,
      service: insertContact.service || null,
      message: insertContact.message || null,
      createdAt: new Date(createdAt)
    };
    
    contacts.push(contact);
    
    const headers = ['id', 'firstName', 'lastName', 'email', 'company', 'service', 'message', 'createdAt'];
    this.writeToExcel(CONTACTS_FILE, contacts, headers);
    
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return this.readFromExcel(CONTACTS_FILE);
  }

  // Newsletter methods
  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const newsletters = this.readFromExcel(NEWSLETTERS_FILE);
    const id = this.getNextId(NEWSLETTERS_FILE);
    const createdAt = new Date().toISOString();
    
    const newsletter: Newsletter = {
      id,
      email: insertNewsletter.email,
      subscribed: true,
      createdAt: new Date(createdAt)
    };
    
    newsletters.push(newsletter);
    
    const headers = ['id', 'email', 'subscribed', 'createdAt'];
    this.writeToExcel(NEWSLETTERS_FILE, newsletters, headers);
    
    return newsletter;
  }

  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return this.readFromExcel(NEWSLETTERS_FILE);
  }

  // Chat message methods
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const messages = this.readFromExcel(CHAT_MESSAGES_FILE);
    const id = this.getNextId(CHAT_MESSAGES_FILE);
    const createdAt = new Date().toISOString();
    
    const message: ChatMessage = {
      id,
      ...insertMessage,
      response: null,
      createdAt: new Date(createdAt)
    };
    
    messages.push(message);
    
    const headers = ['id', 'sessionId', 'message', 'response', 'createdAt'];
    this.writeToExcel(CHAT_MESSAGES_FILE, messages, headers);
    
    return message;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    const messages = this.readFromExcel(CHAT_MESSAGES_FILE);
    return messages.filter(msg => msg.sessionId === sessionId);
  }

  async updateChatMessageResponse(id: number, response: string): Promise<ChatMessage | undefined> {
    const messages = this.readFromExcel(CHAT_MESSAGES_FILE);
    const messageIndex = messages.findIndex(msg => msg.id === id);
    
    if (messageIndex === -1) {
      return undefined;
    }
    
    messages[messageIndex].response = response;
    
    const headers = ['id', 'sessionId', 'message', 'response', 'createdAt'];
    this.writeToExcel(CHAT_MESSAGES_FILE, messages, headers);
    
    return messages[messageIndex];
  }

  // User methods (for compatibility)
  async getUser(id: number): Promise<User | undefined> {
    const users = this.readFromExcel(USERS_FILE);
    return users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = this.readFromExcel(USERS_FILE);
    return users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const users = this.readFromExcel(USERS_FILE);
    const id = this.getNextId(USERS_FILE);
    const createdAt = new Date().toISOString();
    
    const user: User = {
      id,
      ...insertUser
    };
    
    users.push(user);
    
    const headers = ['id', 'username', 'password'];
    this.writeToExcel(USERS_FILE, users, headers);
    
    return user;
  }
}