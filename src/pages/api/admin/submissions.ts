// Delete selected leads from the admin panel.
import { deleteHandler } from '../../../server/admin-api';

export const prerender = false;
export const DELETE = deleteHandler('leads');
