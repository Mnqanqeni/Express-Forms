CREATE TABLE Visitors (
    id SERIAL PRIMARY KEY,
    visitor_name VARCHAR(100),
    visitor_age INTEGER,
    date_of_visit DATE,
    time_of_visit TIME,
    assisted_by VARCHAR(100),
    comments TEXT
);
