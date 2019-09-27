Feature: Student wants to enrol in a school

    Scenario Outline: Student enrol in a Ontario school for the first time
        Given the student of name "<student name>"
        When the student "<student name>" wants to enrol in school "<school name>"
        Then a new student "<identity>" will be created, and granted enrolment under "<school name>"

        Examples:
            | school name      | type      | course name     | course code | course added |
            | Woburn CI        | School    | grade 9 English | ENG101      | course added |
            | Harbord CI        | School    | grade 9 English | ENG101      | course added |

     Scenario Outline: Student requests enrolment to new school from a previous Ontario school
        Given the student "<name>" alreay has an "<type>" acount
        When the "<name>" wants to add a "<course name>" with course code, "<course code>"
        Then a new course will be added

        Examples:
            | name      | type      | course name     | course code | course added |
            | Woburn CI | School    | grade 9 English | ENG101      | course added |
            | M&P       | 3rd Party | grade 9 English | ENG101      | course added |