Feature: Schools offers new course for the upcoming semester

    Scenario Outline: Add new course
        Given the "<school name>" alreay has an "<type>" acount
        When the "<school name>" wants to add a "<course name>" with course code, "<course code>"
        Then a new course "<course name>" will be added to "<school name>"

        Examples:
            | school name      | type      | course name     | course code | course added |
            | Woburn CI | School    | grade 9 English | ENG101      | course added |
            | M&P       | 3rd Party | grade 9 English | ENG101      | course added |~