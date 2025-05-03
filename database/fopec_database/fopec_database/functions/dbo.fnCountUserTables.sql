use fopec
go

if exists (select * from sys.objects where type = 'fn' and name = 'fnCountUserTables')
begin
    drop function fnCountUserTables
end
go

create function fnCountUserTables
(
)
returns varchar(100)
as
begin
    return (
		select count(*) 
		from sys.tables 
		where is_ms_shipped = 0
			and name not like 'sys%'
		)
end
go


--select dbo.fnCountUserTables()

 
