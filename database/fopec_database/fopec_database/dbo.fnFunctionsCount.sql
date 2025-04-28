
use fopec
go

if exists (select * from sys.objects where type = 'fn' and name = 'fnCountFunctions')
begin
    drop function fnCountFunctions
end
go

create function fnCountFunctions
(
)
returns int
as
begin
    return (
			select count(*) as function_count
			from sys.objects
			where type in ('FN', 'IF', 'TF')
			and is_ms_shipped = 0
			and name  != 'fn_diagramobjects'
		)
end
go

--select dbo.fnCountFunctions()

 
