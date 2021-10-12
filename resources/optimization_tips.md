## Create indexes
```sql
CREATE INDEX index_name ON table_name(column_name);
```

## Create clusters
```sql
CLUSTER index_name ON table_name
```

## Reduce categories
```sql
UPDATE table_name
SET column_name = `other`
WHERE column_name not in ('category1','category2') 
```

## Subsample and order
```sql
-- use a smaller sample of original dataset
-- order by numbers assigned to categories when normal ORDER BY ASC or DESC doesn't give the order you need
SELECT t.* 
FROM table_name t tablesample system(20)
LEFT JOIN (
  values 
  ('category2',1),
  ('other',2),
  ('category1',3)
) AS c(categories,ordering)
ON t.category_column_name = c.categories
ORDER BY c.ordering
```
