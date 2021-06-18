/**
* Question: Find students has the same score of some lesson
* Example: Some peple, How to find people that has the same scores of toan, ly, hoa
Lan {toan: 7, ly: 6, hoa: 5, van: 4, su: 5 }
Ngo {toan: 8, ly: 7, hoa: 5, van: 8, su: 2 }
Mui {toan: 8, ly: 5, hoa: 7, van: 8, su: 3 }
Lin {toan: 7, ly: 6, hoa: 5, van: 4, su: 4 }
* Expect: Lan, Lin
*/

/**
* Solution 1:
* Dem tong duoc tinh bang cach toan * 100 + ly * 10 + hoa
* Sau do dem so sanh cac tong diem khac.
* Weak Point: Chi dung khi diem cac mon nho hon 10
*/
SELECT *
FROM students
WHERE (toan * 100 + ly * 10 + hoa) in (
  SELECT (toan * 100 + ly * 10 + hoa) as groupScore
  FROM students as s
  GROUP BY groupScore
  HAVING COUNT(id) > 1
  ORDER BY groupScore DESC
)
ORDER BY (toan * 100 + ly * 10 + hoa) DESC;

/**
* Solution 2v(distinct):
* Tao ra 2 bang va Join thong tin cua 2 bang voi nhau lay thong tin cua nhung phan tu co cung thong tin toan, ly, hoa
*/
SELECT DISTINCT a.*
FROM students a
INNER JOIN students b
ON b.toan = a.toan AND b.ly = a.ly AND b.hoa = a.hoa AND b.id <> a.id
/**
* Solution 2 (where exists):
*/
SELECT *
FROM students a
WHERE EXISTS (
    SELECT 1
    FROM students b
    WHERE b.toan = a.toan AND b.ly = a.ly AND b.hoa = a.hoa AND a.id <> b.id
)
