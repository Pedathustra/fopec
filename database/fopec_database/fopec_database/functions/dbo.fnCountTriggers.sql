use fopec
go

if exists (select * from sys.objects where type = 'fn' and name = 'fnCountTriggers')
begin
    drop function fnCountTriggers
end
go

create function fnCountTriggers
(
)
returns varchar(100)
as
begin
    return (select count(*) from sys.triggers )
end
go

