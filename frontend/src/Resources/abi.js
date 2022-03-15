export const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			}
		],
		"name": "add_new_book",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "book_id",
				"type": "uint256"
			}
		],
		"name": "add_to_shelf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "books",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "unique_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "author_addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "downloads",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reads",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount_staked",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "bookid",
				"type": "uint256"
			}
		],
		"name": "claim_incentives",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "bookid",
				"type": "uint256"
			}
		],
		"name": "downloaded_book",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "is_a_member",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "purchase_membership",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "user_books",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "unique_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "author_addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "downloads",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reads",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount_staked",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "bool",
				"name": "membership_status",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "membership_deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "books_read",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "incentives_earned",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "view_contract_balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "view_users_books",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "unique_id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "author",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "author_addr",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "downloads",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reads",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount_staked",
						"type": "uint256"
					}
				],
				"internalType": "struct Library.book[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]