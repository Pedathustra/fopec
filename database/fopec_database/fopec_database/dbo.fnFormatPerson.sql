use fopec
go

if exists (select * from sys.objects where type = 'if' and name = 'fnFormatPerson')
begin
    drop function fnFormatPerson
end
go

create function fnFormatPerson
(
    @name_display_type int
)
returns table
as
return
(
   select id, 
   display_name = case @name_display_type 
	when 1 then last_name + ', ' + first_name + ' ' + left(middle_name, 1)
	when 2 then first_name + ' ' + middle_name + ' ' + last_name
	when 3 then username + ' (' + last_name + ', ' + first_name + ' ' + left(middle_name, 1) +  ')'
	when 4 then username + ' (' + first_name + ' ' + middle_name + ' ' + left(last_name, 1) + ')'
	else 'invalid format'
	end
from person 
)
go


--select * from fnFOrmatPerson(2)
/*
declare @visualization_type tinyint  = 4

select case @visualization_type 
	when 1 then last_name + ', ' + first_name + ' ' + left(middle_name, 1)
	when 2 then first_name + ' ' + middle_name + ' ' + last_name
	when 3 then username + ' (' + last_name + ', ' + first_name + ' ' + left(middle_name, 1) +  ')'
	when 4 then username + ' (' + first_name + ' ' + middle_name + ' ' + left(last_name, 1) + ')'
	else 'invalid format'
	end
from person 

*/