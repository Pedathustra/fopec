use fopec
go

if exists (select * from sys.objects where type = 'fn' and name = 'fnCountProcedures')
begin
    drop function fnCountProcedures
end
go

create function fnCountProcedures
(
)
returns varchar(100)
as
begin
    return (select count(*) from sys.procedures where is_ms_shipped = 0 and name not like 'sp%')
end
go


--select dbo.fnCountProcedures()
 