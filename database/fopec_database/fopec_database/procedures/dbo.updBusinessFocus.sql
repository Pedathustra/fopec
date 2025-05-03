if exists(select * from sys.procedures where name = 'updBusinessFocus')
begin
	drop proc updBusinessFocus;
end
go

create proc updBusinessFocus
		@id int
	,	@description varchar(255)
as 
	set nocount on;

	if exists(select * from business_focus where [description] = @description)
	begin 
		return -1;
	end

	update business_focus
	set description = @description
	where id = @id;
	
	return 0;

go