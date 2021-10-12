```sql
-- CHANGE STRING COLUMN TO TIMESTAMP, PRESERVING DATES & TIMES
--   your_table contains a string-type column named your_date_time_column
--   your_date_time_column's starting value: "01/01/2018 12:30:00 AM"
--   your_date_time_column's date-type value after query: 2018-01-01T00:30:00Z

ALTER TABLE your_table 
ALTER COLUMN your_date_time_column 
SET DATA TYPE timestamp without time zone
USING to_timestamp(date, 'DD/MM/YYYY HH12:MI:SS AM');


-- STANDARDIZE CATEGORY VALUES
--  your_table contains a string-type your_category_column
--  we want one of your_category_column's values to be Telefonica 
--  we want correct capitalization, + to re-label Telefonica's subsidiary Movistar as Telefonica
--  ~* = ILIKE = case-insensitive 

UPDATE your_table
SET your_category_column = 'Telefonica' 
WHERE your_category_column ~* 'telefonica' OR fullcarrier ~* 'movistar';
```