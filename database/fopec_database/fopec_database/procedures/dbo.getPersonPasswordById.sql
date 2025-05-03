if exists( select name from sys.procedures where name = 'getPersonPasswordById')
begin
	drop proc getPersonPasswordById
end
go

create proc getPersonPasswordById
		@id int
as 
	set nocount on;
 	select	p.password
	from person p
	where id = @id 
	return 0
go