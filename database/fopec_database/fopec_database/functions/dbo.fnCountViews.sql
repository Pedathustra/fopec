use fopec
go

if exists (select * from sys.objects where type = 'fn' and name = 'fnCountViews')
begin
    drop function fnCountViews
end
go

create function fnCountViews
(
)
returns varchar(100)
as
begin
    return (
		select count(*) 
		from sys.views 
		where is_ms_shipped = 0
		)
end
go


--select dbo.fnCountViews()

 
