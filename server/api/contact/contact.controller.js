import Sql from '../../sqldb';
import ApiUtilities from '../utilities';

// list of contacts
export function index(req, res) {
  return ApiUtilities.list(req, res, Sql.Contact);
}

// custom list of contacts
export async function searchByNameOrEmail(req, res) {
  try {
    let contacts = await Sql.Contact.findAll({
      attributes: ['id', 'firstName', 'lastName', 'title', 'emailAddress'],
      where: {
        $or: [
          { name: { $like: req.params.text } },
          { email: { $like: req.params.text }}
        ]
      },
      limit: 15
    });

    return ApiUtilities.respondWithResult(res)(contacts);
  } catch(error) {
    return ApiUtilities.handleError(res);
  }
}

// gets a contact
export function get(req, res) {
  return ApiUtilities.get(req, res, Sql.Contact);
}

// create a contact
export function create(req, res) {
  return ApiUtilities.create(req, res, Sql.Contact);
}

// upserts a contact at a specified ID
export function upsert(req, res) {
  return ApiUtilities.upsert(req, res, Sql.Contact);
}

// updates a contact
export function patch(req, res) {
  return ApiUtilities.patch(req, res, Sql.Contact);
}

// deletes a contact
export function destroy(req, res) {
  return ApiUtilities.destroy(req, res, Sql.Contact);
}
