const sortUsers = (user1, user2) =>
{
        /*
        * Sort ids so that no matter the two users that are 
        * passed (authorized user, blocked user), they are always formatted
        * in the same way because their _ids should never change. This
        * allows us to not have to check if the relationship is
        * flipped (e.g. blocked user in user1 vs user2).
        */
        let users = [user1, user2];
        users.sort((a, b) => {
            return a.localeCompare(b);
        });
        return users;
};

module.exports = { sortUsers };