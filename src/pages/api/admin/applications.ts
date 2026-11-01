// Delete selected job applications from the admin panel.
import { deleteHandler } from '../../../server/admin-delete';

export const prerender = false;
export const DELETE = deleteHandler('applications');
