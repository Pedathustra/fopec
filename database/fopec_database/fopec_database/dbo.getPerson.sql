if exists( select name from sys.procedures where name = 'getPerson')
begin
	drop proc getPerson
end
go

create proc getPerson
		@id int
as 
	set nocount on;
 	select	p.id,
			p.first_name,
			p.last_name,
			p.middle_name,
			p.username,
			p.is_active
	from person p
	where id = @id 
	return 0
go