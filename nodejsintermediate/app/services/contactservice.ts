import { Contact } from "../models/contacts";
import { ICrudService, IListableService, IPageable, Page } from "./crudservice";

export interface IContactService extends 
    ICrudService<Contact>, IListableService<Contact>, IPageable<Contact> { }