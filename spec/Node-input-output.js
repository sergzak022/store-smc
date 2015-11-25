exports.input_0 = [{
    "id": "CS 83R",
    "name": "Server-Side Ruby Web Programming",
    "units": 3,
    "transfer": [
        "CSU"
    ],
    "prerequisite": "Computer Science 60 and 80 and one of the following: CS 15 or 52 or 53A or 55.",
    "prerequisite_fixed": "CS 60 and CS 80 and ( CS 15 or CS 52 or CS 53A or CS 55 )",
    "requirements": {
        "type": "exactly",
        "aggregateBy": null,
        "select": 3,
        "elements": [
            "CS 60", {
                "type": "exactly",
                "aggregateBy": null,
                "select": 1,
                "elements": [
                    "CS 15",
                    "CS 52"
                ]
            }
        ]
    },
    "description": "This course teaches how to design and write applications utilizing Ruby on Rails, an open-source web application framework based on the Ruby programming language. In this course, students will create applications that gather information from a web server, query databases and render results.",
    "sections": [{
        "id": "1724",
        "time": "Arrange-4.5Hours",
        "room": "N/A ONLINE",
        "instructor": "Stahl H A"
    }]
}, {
    "id": "CS 60",
    "name": "Databases",
    "units": 3,
    "transfer": [
        "CSU"
    ],
    "prerequisite": "None.",
    "prerequisite_fixed": "",
    "requirements": {
        "type": "exactly",
        "aggregateBy": null,
        "select": 0,
        "elements": []
    },
    "description": "This course teaches how to design and write applications utilizing Ruby on Rails, an open-source web application framework based on the Ruby programming language. In this course, students will create applications that gather information from a web server, query databases and render results.",
    "sections": [{
        "id": "1724",
        "time": "Arrange-4.5Hours",
        "room": "N/A ONLINE",
        "instructor": "Stahl H A"
    }]
}, {
    "id": "CS 15",
    "name": "Visual Basic",
    "units": 3,
    "transfer": [
        "CSU"
    ],
    "prerequisite": "None.",
    "prerequisite_fixed": "",
    "requirements": {
        "type": "exactly",
        "aggregateBy": null,
        "select": 0,
        "elements": []
    },
    "description": "This course teaches how to design and write applications utilizing Ruby on Rails, an open-source web application framework based on the Ruby programming language. In this course, students will create applications that gather information from a web server, query databases and render results.",
    "sections": [{
        "id": "1724",
        "time": "Arrange-4.5Hours",
        "room": "N/A ONLINE",
        "instructor": "Stahl H A"
    }]
}, {
    "id": "CS 52",
    "name": "C++ Programming",
    "units": 3,
    "transfer": [
        "CSU"
    ],
    "prerequisite": "None.",
    "prerequisite_fixed": "",
    "requirements": {
        "type": "exactly",
        "aggregateBy": null,
        "select": 0,
        "elements": []
    },
    "description": "This course teaches how to design and write applications utilizing Ruby on Rails, an open-source web application framework based on the Ruby programming language. In this course, students will create applications that gather information from a web server, query databases and render results.",
    "sections": [{
        "id": "1724",
        "time": "Arrange-4.5Hours",
        "room": "N/A ONLINE",
        "instructor": "Stahl H A"
    }]
}];


exports.output_0 = {
    "unmodified": {
        "inserted": [{
            "__v": 0,
            "requirements": {
                "type": "exactly",
                "aggregateBy": null,
                "select": 0,
                "elements": []
            },
            "attributes": {
                "id": "CS 52",
                "name": "C++ Programming",
                "units": 3,
                "prerequisite": "None.",
                "prerequisite_fixed": "",
                "transfer": ["CSU"]
            }
        }, {
            "__v": 0,
            "requirements": {
                "type": "exactly",
                "aggregateBy": null,
                "select": 0,
                "elements": []
            },
            "attributes": {
                "id": "CS 15",
                "name": "Visual Basic",
                "units": 3,
                "prerequisite": "None.",
                "prerequisite_fixed": "",
                "transfer": ["CSU"]
            }
        }, {
            "__v": 0,
            "requirements": {
                "type": "exactly",
                "aggregateBy": null,
                "select": 0,
                "elements": []
            },
            "attributes": {
                "id": "CS 60",
                "name": "Databases",
                "units": 3,
                "prerequisite": "None.",
                "prerequisite_fixed": "",
                "transfer": ["CSU"]
            }
        }, {
            "__v": 0,
            "requirements": {
                "type": "exactly",
                "aggregateBy": null,
                "select": 3,
                "elements": ["CS 60", {
                    "elements": ["CS 15", "CS 52"],
                    "select": 1,
                    "aggregateBy": null,
                    "type": "exactly"
                }]
            },
            "attributes": {
                "id": "CS 83R",
                "name": "Server-Side Ruby Web Programming",
                "units": 3,
                "prerequisite": "Computer Science 60 and 80 and one of the following: CS 15 or 52 or 53A or 55.",
                "prerequisite_fixed": "CS 60 and CS 80 and ( CS 15 or CS 52 or CS 53A or CS 55 )",
                "transfer": ["CSU"]
            }
        }],
        "updated": []
    },
    "modified": {
        "inserted": [{
            "__v": 0,
            "requirements": {
                "aggregateBy": null,
                "select": 0,
                "elements": [],
                "type": "exactly"
            },
            "attributes": {
                "id": "CS 52",
                "name": "C++ Programming",
                "units": 3,
                "prerequisite": "None.",
                "prerequisite_fixed": "",
                "transfer": ["CSU"]
            }
        }, {
            "__v": 0,
            "requirements": {
                "aggregateBy": null,
                "select": 0,
                "elements": [],
                "type": "exactly"
            },
            "attributes": {
                "id": "CS 15",
                "name": "Visual Basic",
                "units": 3,
                "prerequisite": "None.",
                "prerequisite_fixed": "",
                "transfer": ["CSU"]
            }
        }, {
            "__v": 0,
            "requirements": {
                "aggregateBy": null,
                "select": 0,
                "elements": [],
                "type": "exactly"
            },
            "attributes": {
                "id": "CS 60",
                "name": "Databases",
                "units": 3,
                "prerequisite": "None.",
                "prerequisite_fixed": "",
                "transfer": ["CSU"]
            }
        }, {
            "__v": 0,
            "requirements": {
                "type": "exactly",
                "aggregateBy": null,
                "select": 3,
                "elements": ["56550b30a9cc0ddc97d5cccd", {
                    "elements": ["56550b30a9cc0ddc97d5cccc", "56550b30a9cc0ddc97d5cccb"],
                    "select": 1,
                    "aggregateBy": null,
                    "type": "exactly"
                }]
            },
            "attributes": {
                "id": "CS 83R",
                "name": "Server-Side Ruby Web Programming",
                "units": 3,
                "prerequisite": "Computer Science 60 and 80 and one of the following: CS 15 or 52 or 53A or 55.",
                "prerequisite_fixed": "CS 60 and CS 80 and ( CS 15 or CS 52 or CS 53A or CS 55 )",
                "transfer": ["CSU"]
            }
        }],
        "updated": []
    },
    "unrecognized": {
        "inserted": []
    },
    "requirementsChanged": []
};

exports.input_1 = [{
    "id": "CS 83R",
    "name": "Server-Side Ruby Web Programming",
    "units": 3,
    "transfer": [
        "CSU"
    ],
    "prerequisite": "Computer Science 60 and 80 and one of the following: CS 15 or 52 or 53A or 55.",
    "prerequisite_fixed": "CS 60 and CS 80 and ( CS 15 or CS 52 or CS 53A or CS 55 )",
    "requirements": {
        "type": "exactly",
        "aggregateBy": null,
        "select": 3,
        "elements": [
            "CS 60",
            "CS 80", {
                "type": "exactly",
                "aggregateBy": null,
                "select": 1,
                "elements": [
                    "CS 15",
                    "CS 52",
                    "CS 53A",
                    "CS 55"
                ]
            }
        ]
    },
    "description": "This course teaches how to design and write applications utilizing Ruby on Rails, an open-source web application framework based on the Ruby programming language. In this course, students will create applications that gather information from a web server, query databases and render results.",
    "sections": [{
        "id": "1724",
        "time": "Arrange-4.5Hours",
        "room": "N/A ONLINE",
        "instructor": "Stahl H A"
    }]
}, {
    "id": "MCRBIO 1",
    "name": "Fundamentals of Microbiology",
    "units": 5,
    "transfer": [
        "UC",
        "CSU"
    ],
    "prerequisite": "Chemistry 10 or eligibility for Chemistry 11, and Physiology 3 or Biology 3 or 21.",
    "prerequisite_fixed": "CHEM 10 and ( PHYS 3 or BIOL 3 or BIOL 21 )",
    "requirements": {
        "type": "exactly",
        "aggregateBy": null,
        "select": 2,
        "elements": [
            "CHEM 10", {
                "type": "exactly",
                "aggregateBy": null,
                "select": 1,
                "elements": [
                    "PHYS 3",
                    "BIOL 3",
                    "BIOL 21"
                ]
            }
        ]
    },
    "advisory": "Eligibility for English 1.",
    "description": "This course involves study of several types of microorganisms with emphasis on bacteria. Principles of microbiology, metabolism, genetics, immunology, and medical and nonmedical applications are considered. The laboratory includes aseptic transfer techniques, cultural characteristics, methods of microscopy, and analytical techniques for identifying microbial organisms. The course content is related to both general and clinical applications including recent molecular biological and serological techniques.",
    "sections": [{
        "id": "2871",
        "time": "8:00a-11:05a MWF",
        "room": "SCI 209",
        "instructor": "Narey V"
    }, {
        "id": "2872",
        "time": "12:45p-2:05p MW",
        "room": "SCI 159",
        "instructor": "Buchanan A G"
    }, {
        "id": "2873",
        "time": "12:45p-2:05p MW",
        "room": "SCI 159",
        "instructor": "Buchanan A G"
    }, {
        "id": "2874",
        "time": "2:00p-5:05p MW",
        "room": "SCI 209",
        "instructor": "Kluckhohn Jones L W"
    }, {
        "id": "4357",
        "time": "6:45p-9:50p MWTh",
        "room": "SCI 209",
        "instructor": "Pepper E D"
    }]
}];

exports.output_1 = {
    "unmodified": {
        "inserted": [{
            "__v": 0,
            "requirements": {
                "type": "exactly",
                "aggregateBy": null,
                "select": 2,
                "elements": ["CHEM 10", {
                    "elements": ["PHYS 3", "BIOL 3", "BIOL 21"],
                    "select": 1,
                    "aggregateBy": null,
                    "type": "exactly"
                }]
            },
            "attributes": {
                "id": "MCRBIO 1",
                "name": "Fundamentals of Microbiology",
                "units": 5,
                "prerequisite": "Chemistry 10 or eligibility for Chemistry 11, and Physiology 3 or Biology 3 or 21.",
                "prerequisite_fixed": "CHEM 10 and ( PHYS 3 or BIOL 3 or BIOL 21 )",
                "transfer": ["UC", "CSU"]
            }
        }, {
            "__v": 0,
            "requirements": {
                "type": "exactly",
                "aggregateBy": null,
                "select": 3,
                "elements": ["CS 60", "CS 80", {
                    "elements": ["CS 15", "CS 52", "CS 53A", "CS 55"],
                    "select": 1,
                    "aggregateBy": null,
                    "type": "exactly"
                }]
            },
            "attributes": {
                "id": "CS 83R",
                "name": "Server-Side Ruby Web Programming",
                "units": 3,
                "prerequisite": "Computer Science 60 and 80 and one of the following: CS 15 or 52 or 53A or 55.",
                "prerequisite_fixed": "CS 60 and CS 80 and ( CS 15 or CS 52 or CS 53A or CS 55 )",
                "transfer": ["CSU"]
            }
        }],
        "updated": []
    },
    "modified": {
        "inserted": [{
            "__v": 0,
            "requirements": {
                "type": "exactly",
                "aggregateBy": null,
                "select": 2,
                "elements": ["56550b870e98472c9451d2fa", {
                    "elements": ["56550b870e98472c9451d2fb", "56550b870e98472c9451d2fc", "56550b870e98472c9451d2fd"],
                    "select": 1,
                    "aggregateBy": null,
                    "type": "exactly"
                }]
            },
            "attributes": {
                "id": "MCRBIO 1",
                "name": "Fundamentals of Microbiology",
                "units": 5,
                "prerequisite": "Chemistry 10 or eligibility for Chemistry 11, and Physiology 3 or Biology 3 or 21.",
                "prerequisite_fixed": "CHEM 10 and ( PHYS 3 or BIOL 3 or BIOL 21 )",
                "transfer": ["UC", "CSU"]
            }
        }, {
            "__v": 0,
            "requirements": {
                "type": "exactly",
                "aggregateBy": null,
                "select": 3,
                "elements": ["56550b870e98472c9451d2fe", "56550b870e98472c9451d2ff", {
                    "elements": ["56550b870e98472c9451d300", "56550b870e98472c9451d301", "56550b870e98472c9451d302", "56550b870e98472c9451d303"],
                    "select": 1,
                    "aggregateBy": null,
                    "type": "exactly"
                }]
            },
            "attributes": {
                "id": "CS 83R",
                "name": "Server-Side Ruby Web Programming",
                "units": 3,
                "prerequisite": "Computer Science 60 and 80 and one of the following: CS 15 or 52 or 53A or 55.",
                "prerequisite_fixed": "CS 60 and CS 80 and ( CS 15 or CS 52 or CS 53A or CS 55 )",
                "transfer": ["CSU"]
            }
        }],
        "updated": []
    },
    "unrecognized": {
        "inserted": [{
            "__v": 0,
            "requirements": {
                "aggregateBy": null,
                "select": 0,
                "elements": [],
                "type": "exactly"
            },
            "attributes": {
                "name": "CHEM 10"
            }
        }, {
            "__v": 0,
            "requirements": {
                "aggregateBy": null,
                "select": 0,
                "elements": [],
                "type": "exactly"
            },
            "attributes": {
                "name": "PHYS 3"
            }
        }, {
            "__v": 0,
            "requirements": {
                "aggregateBy": null,
                "select": 0,
                "elements": [],
                "type": "exactly"
            },
            "attributes": {
                "name": "BIOL 3"
            }
        }, {
            "__v": 0,
            "requirements": {
                "aggregateBy": null,
                "select": 0,
                "elements": [],
                "type": "exactly"
            },
            "attributes": {
                "name": "BIOL 21"
            }
        }, {
            "__v": 0,
            "requirements": {
                "aggregateBy": null,
                "select": 0,
                "elements": [],
                "type": "exactly"
            },
            "attributes": {
                "name": "CS 60"
            }
        }, {
            "__v": 0,
            "requirements": {
                "aggregateBy": null,
                "select": 0,
                "elements": [],
                "type": "exactly"
            },
            "attributes": {
                "name": "CS 80"
            }
        }, {
            "__v": 0,
            "requirements": {
                "aggregateBy": null,
                "select": 0,
                "elements": [],
                "type": "exactly"
            },
            "attributes": {
                "name": "CS 15"
            }
        }, {
            "__v": 0,
            "requirements": {
                "aggregateBy": null,
                "select": 0,
                "elements": [],
                "type": "exactly"
            },
            "attributes": {
                "name": "CS 52"
            }
        }, {
            "__v": 0,
            "requirements": {
                "aggregateBy": null,
                "select": 0,
                "elements": [],
                "type": "exactly"
            },
            "attributes": {
                "name": "CS 53A"
            }
        }, {
            "__v": 0,
            "requirements": {
                "aggregateBy": null,
                "select": 0,
                "elements": [],
                "type": "exactly"
            },
            "attributes": {
                "name": "CS 55"
            }
        }]
    },
    "requirementsChanged": []
};