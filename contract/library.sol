// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0 <0.9.0;

contract Library{
    uint id_counter = 0;

    struct book{
        uint unique_id;
        string title;
        string author;
        address author_addr;
        uint downloads;
        uint reads;
        uint amount_staked;
    }

    struct user{
        bool membership_status;
        uint membership_deadline;
        uint books_read;
        uint incentives_earned;
    }

    mapping(address => book[]) public user_books;
    mapping(address => user) public users;

    book[] public books;

    function add_new_book(string memory title, string memory author) public payable returns(uint){
        require(msg.value>2000000000000000000);
        books.push(book(id_counter, title, author, msg.sender, 0, 0, msg.value));
        id_counter++;
        return id_counter-1;
    }

    function purchase_membership(uint amount) public payable returns(uint){
        require(msg.value==2000000000000000000);
        require(amount==2);
        user storage my_user = users[msg.sender];
        my_user.membership_status=true;
        my_user.membership_deadline = uint256(block.timestamp + 180 *1 days);
        my_user.books_read=0;
        my_user.incentives_earned=0;
        return 1;
    }

    function add_to_shelf(uint book_id) public returns(uint){
        require(users[msg.sender].membership_status==true);
        book[] storage usersbooks = user_books[msg.sender];
        usersbooks.push(books[book_id]);
        book storage mybook = books[book_id];
        mybook.downloads++;
        return 1;
    }

      function view_contract_balance() public view returns(uint256){
        return address(this).balance;
    }

    function is_a_member() public view returns(uint){
        if(users[msg.sender].membership_status==true)
            return 1;
        else
            return 0;
    }

    function downloaded_book(uint bookid) public view returns(uint){
        book[] storage mybooks = user_books[msg.sender];
        for(uint i=0;i<mybooks.length;i++){
            if(mybooks[i].unique_id == bookid){
                return 1;
            }
        }
        return 0;
    }

    function claim_incentives(uint bookid) public returns(uint){
        require(downloaded_book(bookid)==1);
        uint amt = books[bookid].amount_staked / 100;
        payable(msg.sender).transfer(amt);
        users[msg.sender].incentives_earned+=amt;
        users[msg.sender].books_read++;
        books[bookid].reads++;
        return 1;
    }

    function view_users_books() public view returns(book[] memory){
        return user_books[msg.sender];
    }
}